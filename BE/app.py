from flask import Flask, request, jsonify
import os.path
import io
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload, MediaFileUpload,MediaIoBaseUpload
import requests
import zipfile
from bs4 import BeautifulSoup
import base64

app = Flask(__name__)

SCOPES = [
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/documents.readonly",
]


# Load or refresh Google API credentials
def get_credentials():
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds


# Build Google Drive and Google Docs service
creds = get_credentials()
drive_service = build("drive", "v3", credentials=creds)
docs_service = build("docs", "v1", credentials=creds)


## This is temp to handle the CORS
@app.after_request
def after_request_func(response):
    origin = request.headers.get("Origin")
    if request.method == "OPTIONS":
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Headers", "x-csrf-token")
        response.headers.add(
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        )
        if origin:
            response.headers.add("Access-Control-Allow-Origin", "*")
    else:
        response.headers.add("Access-Control-Allow-Credentials", "true")
        if origin:
            response.headers.add("Access-Control-Allow-Origin", "*")

    return response


# Create a folder in Google Drive
@app.route("/create_folder", methods=["POST"])
def create_folder():
    data = request.get_json()
    folder_metadata = {
        "name": data["name"],
        "mimeType": "application/vnd.google-apps.folder",
    }
    folder = drive_service.files().create(body=folder_metadata).execute()
    return jsonify({"folder_id": folder.get("id")})


# Create a Google Doc in a specified folder
@app.route("/create_doc", methods=["POST"])
def create_doc():
    data = request.get_json()
    doc_metadata = {
        "name": data["name"],
        "parents": [data["folder_id"]],
        "mimeType": "application/vnd.google-apps.document",
    }
    doc = drive_service.files().create(body=doc_metadata).execute()
    return jsonify({"doc_id": doc.get("id")})


def download_html(html_zip):

    # Get the first HTML file in the zip
    html_file = next(f for f in html_zip.namelist() if f.endswith(".html"))

    html_bytes = html_zip.read(html_file)

    # decode bytes to utf-8 string
    html_string = html_bytes.decode("utf-8")

    # Parse HTML content using BeautifulSoup
    # TODO: Naveen or Jigar please check why format is not happening when we're getting two versions
    soup = BeautifulSoup(html_string, "html.parser")

    # Find all image tags in the HTML
    images = soup.find_all("img")
    if len(images) == 0:
        return html_string

    # Replace image paths with base64-encoded image data
    for img in images:
        img_path = img["src"]
        # print(img_path)
        image_data = html_zip.read(img_path)
        image_data = base64.b64encode(image_data).decode("utf-8")
        img["src"] = f"data:image/png;base64,{image_data}"

    # Get the updated HTML content with base64-encoded images
    updated_html_content = str(soup)
    updated_html_content = updated_html_content.replace("\u200b", "")

    return updated_html_content


# Download HTML content of a Google Doc
@app.route("/download_current_version", methods=["POST"])
def download_current_version():
    data = request.get_json()
    download_request = drive_service.files().export_media(
        fileId=data["doc_id"], mimeType="application/zip"
    )
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, download_request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()

    html_zip = zipfile.ZipFile(fh)

    return download_html(html_zip)


# Upload modified HTML content to a Google Doc
@app.route("/upload_html", methods=["POST"])
def upload_html():
    data = request.get_json()
    modified_html_data = data["modified_html_data"]
    # Convert HTML content to bytes
    html_bytes = modified_html_data.encode('utf-8')
    # Create an in-memory file-like object
    html_stream = io.BytesIO(html_bytes)        
    print('html stream is', modified_html_data,html_stream)
    media = MediaIoBaseUpload(html_stream, mimetype='text/html', resumable=True)
    # media = MediaFileUpload(modified_html_data, mimetype="text/html")
    updated_file = (
        drive_service.files()
        .update(
            fileId=data["doc_id"],
            media_body=media,
            supportsAllDrives=True,
            uploadType="media",
        )
        .execute()
    )
    return jsonify({"updated_doc_id": updated_file["id"]})


# List revisions of a Google Doc
@app.route("/list_revisions", methods=["GET"])
def list_revisions():
    doc_id = request.args.get("doc_id")
    revisions = drive_service.revisions().list(fileId=doc_id).execute()
    return jsonify(revisions)


@app.route("/download_specific_revision_html", methods=["POST"])
def download_specific_revision_html():
    data = request.get_json()
    doc_id = data["doc_id"]
    selected_revision_numbers = data["selected_revision_numbers"]

    html_content = {}
    drive_service_2 = build("drive", "v2", credentials=creds)

    for revision_id in selected_revision_numbers:
        # need to add try and catch
        revisions_v2 = drive_service_2.revisions().get(
            fileId=doc_id, revisionId=str(revision_id)
        )
        revised_file = revisions_v2.execute()
        export_link = revised_file["exportLinks"]["application/zip"]
        print(export_link)

        headers = {"Authorization": "Bearer " + creds.token}

        # Use requests to get the export link with the appropriate headers
        response = requests.get(export_link, headers=headers)

        # response = drive_service._http.request("GET", export_link)
        if response.status_code == 200:
            # Extract HTML content from the downloaded zip file
            fh = io.BytesIO(response.content)
            # downloader = MediaIoBaseDownload(fh, response.content)
            # done = False
            # while done is False:
            # status, done = downloader.next_chunk()

            html_zip = zipfile.ZipFile(fh)
            return download_html(html_zip)
            # TODO: Naveen or Jigar please check why format is not happening when we're getting two versions
            html_content[revision_id] = download_html(html_zip)

            # print(response.content)
            # with zipfile.ZipFile(io.BytesIO(response.content), "r") as zip_ref:
            # print(zip_ref)

            # for file in zip_ref.namelist():
            #     with zip_ref.open(file) as html_file:
            #         html_content[file] = html_file.read().decode('utf-8')
            # Append the HTML content to the list
            # html_content[revision_id] = download_html(zip_ref)  # response.text
        else:
            print(response.status_code)
    # return two version of HTML
    return jsonify(html_content)


if __name__ == "__main__":
    app.run(debug=True)
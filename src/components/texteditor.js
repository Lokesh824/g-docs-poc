import React, { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Button, Modal, Input, Select, Col, Row } from "antd";
// Import katex
import "katex/dist/katex.min.css";
import axios from "axios";
import DocumentMenuBar from "./Menubar/doc-menubar";
import MyDiffComponent from "./diffChecker";
import katex from "katex";
import "katex/dist/contrib/auto-render";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
const htmlTemplate = `<html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>Preview</title>
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/logo192.png">
<link rel="manifest" href="/manifest.json">
<style>
    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxTQUFTO0VBQ1Q7O2NBRVk7RUFDWixtQ0FBbUM7RUFDbkMsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0U7YUFDVztBQUNiIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgJ1JvYm90bycsICdPeHlnZW4nLFxuICAgICdVYnVudHUnLCAnQ2FudGFyZWxsJywgJ0ZpcmEgU2FucycsICdEcm9pZCBTYW5zJywgJ0hlbHZldGljYSBOZXVlJyxcbiAgICBzYW5zLXNlcmlmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbn1cblxuY29kZSB7XG4gIGZvbnQtZmFtaWx5OiBzb3VyY2UtY29kZS1wcm8sIE1lbmxvLCBNb25hY28sIENvbnNvbGFzLCAnQ291cmllciBOZXcnLFxuICAgIG1vbm9zcGFjZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */
</style>
<style>
    .sun-editor {
        width: auto;
        height: auto;
        box-sizing: border-box;
        font-family: Helvetica Neue;
        border: 1px solid #dadada;
        background-color: #fff;
        color: #000;
        user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none
    }

    .sun-editor * {
        box-sizing: border-box;
        -webkit-user-drag: none;
        overflow: visible
    }

    .sun-editor-common button,
    .sun-editor-common input,
    .sun-editor-common select,
    .sun-editor-common textarea {
        font-size: 14px;
        line-height: 1.5
    }

    .sun-editor-common blockquote,
    .sun-editor-common body,
    .sun-editor-common button,
    .sun-editor-common code,
    .sun-editor-common dd,
    .sun-editor-common div,
    .sun-editor-common dl,
    .sun-editor-common dt,
    .sun-editor-common fieldset,
    .sun-editor-common form,
    .sun-editor-common h1,
    .sun-editor-common h2,
    .sun-editor-common h3,
    .sun-editor-common h4,
    .sun-editor-common h5,
    .sun-editor-common h6,
    .sun-editor-common input,
    .sun-editor-common legend,
    .sun-editor-common li,
    .sun-editor-common ol,
    .sun-editor-common p,
    .sun-editor-common pre,
    .sun-editor-common select,
    .sun-editor-common td,
    .sun-editor-common textarea,
    .sun-editor-common th,
    .sun-editor-common ul {
        margin: 0;
        padding: 0;
        border: 0
    }

    .sun-editor-common dl,
    .sun-editor-common li,
    .sun-editor-common menu,
    .sun-editor-common ol,
    .sun-editor-common ul {
        list-style: none !important
    }

    .sun-editor-common hr {
        margin: 6px 0 !important
    }

    .sun-editor textarea {
        resize: none;
        border: 0;
        padding: 0
    }

    .sun-editor button {
        border: 0;
        background-color: transparent;
        touch-action: manipulation;
        cursor: pointer;
        outline: none
    }

    .sun-editor button,
    .sun-editor input,
    .sun-editor select,
    .sun-editor textarea {
        vertical-align: middle
    }

    .sun-editor button span {
        display: block;
        margin: 0;
        padding: 0
    }

    .sun-editor button .txt {
        display: block;
        margin-top: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .sun-editor button * {
        pointer-events: none;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden
    }

    .sun-editor svg {
        fill: currentColor
    }

    .sun-editor .se-svg,
    .sun-editor button>svg {
        width: 16px;
        height: 16px;
        margin: auto;
        fill: currentColor;
        display: block;
        text-align: center;
        float: none
    }

    .sun-editor .close>svg,
    .sun-editor .se-dialog-close>svg {
        width: 10px;
        height: 10px
    }

    .sun-editor .se-btn-select>svg {
        float: right;
        width: 10px;
        height: 10px
    }

    .sun-editor .se-btn-list>.se-list-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: -1px 10px 0 0;
        vertical-align: middle
    }

    .sun-editor .se-line-breaker>button>svg {
        width: 24px;
        height: 24px
    }

    .sun-editor button>i:before {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        font-size: 15px;
        line-height: 2
    }

    .sun-editor button>[class=se-icon-text] {
        font-size: 20px;
        line-height: 1
    }

    .sun-editor .se-arrow,
    .sun-editor .se-arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border: 11px solid transparent
    }

    .sun-editor .se-arrow.se-arrow-up {
        top: -11px;
        left: 20px;
        margin-left: -11px;
        border-top-width: 0;
        border-bottom-color: #dadada
    }

    .sun-editor .se-arrow.se-arrow-up:after {
        top: 1px;
        margin-left: -11px;
        content: " ";
        border-top-width: 0;
        border-bottom-color: #fff
    }

    .sun-editor .se-toolbar .se-arrow.se-arrow-up:after {
        border-bottom-color: #fafafa
    }

    .sun-editor .se-arrow.se-arrow-down {
        top: 0;
        left: 0;
        margin-left: -11px;
        border-bottom-width: 0;
        border-top-color: #dadada
    }

    .sun-editor .se-arrow.se-arrow-down:after {
        top: -12px;
        margin-left: -11px;
        content: " ";
        border-bottom-width: 0;
        border-top-color: #fff
    }

    .sun-editor .se-toolbar .se-arrow.se-arrow-down:after {
        border-top-color: #fafafa
    }

    .sun-editor .se-container {
        position: relative;
        width: 100%;
        height: 100%
    }

    .sun-editor button {
        color: #000
    }

    .sun-editor .se-btn {
        float: left;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 4px;
        margin: 1px !important;
        padding: 0;
        font-size: 12px;
        line-height: 27px
    }

    .sun-editor .se-btn:enabled:focus,
    .sun-editor .se-btn:enabled:hover {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-btn:enabled:active {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        box-shadow: inset 0 3px 5px #c1c1c1
    }

    .sun-editor .se-btn-primary {
        color: #000;
        background-color: #c7deff;
        border: 1px solid #80bdff;
        border-radius: 4px
    }

    .sun-editor .se-btn-primary:focus,
    .sun-editor .se-btn-primary:hover {
        color: #000;
        background-color: #80bdff;
        border-color: #3f9dff;
        outline: 0 none
    }

    .sun-editor .se-btn-primary:active {
        color: #fff;
        background-color: #3f9dff;
        border-color: #4592ff;
        box-shadow: inset 0 3px 5px #4592ff
    }

    .sun-editor input,
    .sun-editor select,
    .sun-editor textarea {
        color: #000;
        border: 1px solid #ccc;
        border-radius: 4px
    }

    .sun-editor input:focus,
    .sun-editor select:focus,
    .sun-editor textarea:focus {
        border: 1px solid #80bdff;
        outline: 0;
        box-shadow: 0 0 0 .2rem #c7deff;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
    }

    .sun-editor .se-btn:enabled.active {
        color: #4592ff;
        outline: 0 none
    }

    .sun-editor .se-btn:enabled.active:focus,
    .sun-editor .se-btn:enabled.active:hover {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-btn:enabled.active:active {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        box-shadow: inset 0 3px 5px #c1c1c1
    }

    .sun-editor .se-btn:enabled.on {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-btn:enabled.on:focus,
    .sun-editor .se-btn:enabled.on:hover {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        outline: 0 none
    }

    .sun-editor .se-btn:enabled.on:active {
        background-color: #c1c1c1;
        border-color: #b1b1b1;
        box-shadow: inset 0 3px 5px #b1b1b1
    }

    .sun-editor .se-btn-list:disabled,
    .sun-editor .se-btn:disabled,
    .sun-editor button:disabled {
        cursor: not-allowed;
        background-color: inherit;
        color: #bdbdbd
    }

    .sun-editor .se-loading-box {
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #fff;
        opacity: .7;
        filter: alpha(opacity=70);
        z-index: 2147483647
    }

    .sun-editor .se-loading-box .se-loading-effect {
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        height: 25px;
        width: 25px;
        border-top: 2px solid #07d;
        border-right: 2px solid transparent;
        border-radius: 50%;
        animation: spinner .8s linear infinite;
        margin: -25px 0 0 -25px
    }

    .sun-editor .se-line-breaker {
        position: absolute;
        display: none;
        width: 100%;
        height: 1px;
        cursor: text;
        border-top: 1px solid #3288ff;
        z-index: 7
    }

    .sun-editor .se-line-breaker>button.se-btn {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 30px;
        top: -15px;
        float: none;
        left: -50%;
        background-color: #fff;
        border: 1px solid #0c2240;
        opacity: .6;
        cursor: pointer
    }

    .sun-editor .se-line-breaker>button.se-btn:hover {
        opacity: .9;
        background-color: #fff;
        border-color: #041b39
    }

    .sun-editor .se-line-breaker-component {
        position: absolute;
        display: none;
        width: 24px;
        height: 24px;
        background-color: #fff;
        border: 1px solid #0c2240;
        opacity: .6;
        border-radius: 4px;
        cursor: pointer;
        z-index: 7
    }

    .sun-editor .se-line-breaker-component:hover {
        opacity: .9
    }

    .sun-editor .se-toolbar {
        display: block;
        position: relative;
        height: auto;
        width: 100%;
        overflow: visible;
        padding: 0;
        margin: 0;
        background-color: #fafafa;
        outline: 1px solid #dadada;
        z-index: 5
    }

    .sun-editor .se-toolbar-shadow {
        display: block !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        background-color: transparent !important;
        outline: none !important;
        border: none !important;
        z-index: 0 !important
    }

    .sun-editor .se-toolbar-cover {
        position: absolute;
        display: none;
        font-size: 36px;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #fefefe;
        opacity: .5;
        filter: alpha(opacity=50);
        cursor: not-allowed;
        z-index: 4
    }

    .sun-editor .se-toolbar-separator-vertical {
        display: inline-block;
        height: 0;
        width: 0;
        margin: 0;
        vertical-align: top
    }

    .sun-editor .se-toolbar.se-toolbar-balloon,
    .sun-editor .se-toolbar.se-toolbar-inline {
        display: none;
        position: absolute;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5)
    }

    .sun-editor .se-toolbar.se-toolbar-balloon {
        z-index: 2147483647;
        width: auto
    }

    .sun-editor .se-toolbar.se-toolbar-sticky {
        position: fixed;
        top: 0
    }

    .sun-editor .se-toolbar-sticky-dummy {
        display: none;
        position: static;
        z-index: -1
    }

    .sun-editor .se-btn-module {
        display: inline-block
    }

    .sun-editor .se-btn-module-border {
        border: 1px solid #dadada;
        border-radius: 4px;
        margin-left: 1px;
        margin-right: 1px
    }

    .sun-editor .se-btn-module-enter {
        display: block;
        width: 100%;
        height: 0;
        margin: 0;
        padding: 0;
        background-color: transparent
    }

    .sun-editor .se-toolbar-more-layer {
        margin: 0 -3px;
        background-color: #fafafa
    }

    .sun-editor .se-toolbar-more-layer .se-more-layer {
        display: none;
        border-top: 1px solid #dadada
    }

    .sun-editor .se-toolbar-more-layer .se-more-layer .se-more-form {
        display: inline-block;
        width: 100%;
        height: auto;
        padding: 4px 3px 0
    }

    .sun-editor .se-btn-module .se-btn-more.se-btn-more-text {
        width: auto;
        padding: 0 4px
    }

    .sun-editor .se-btn-module .se-btn-more:focus,
    .sun-editor .se-btn-module .se-btn-more:hover {
        color: #000;
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        outline: 0 none
    }

    .sun-editor .se-btn-module .se-btn-more.on {
        color: #333;
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        outline: 0 none
    }

    .sun-editor .se-btn-module .se-btn-more.on:hover {
        color: #000;
        background-color: #c1c1c1;
        border-color: #b1b1b1;
        outline: 0 none
    }

    .sun-editor .se-menu-list,
    .sun-editor .se-menu-list li {
        float: left;
        padding: 0;
        margin: 0
    }

    .sun-editor .se-menu-list li {
        position: relative
    }

    .sun-editor .se-btn-select {
        width: auto;
        display: flex;
        padding: 4px 6px
    }

    .sun-editor .se-btn-select .txt {
        flex: auto;
        text-align: left
    }

    .sun-editor .se-btn-select.se-btn-tool-font {
        width: 100px
    }

    .sun-editor .se-btn-select.se-btn-tool-format {
        width: 82px
    }

    .sun-editor .se-btn-select.se-btn-tool-size {
        width: 78px
    }

    .sun-editor .se-btn-tray {
        position: relative;
        width: 100%;
        height: auto;
        padding: 4px 3px 0;
        margin: 0
    }

    .sun-editor .se-menu-tray {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0
    }

    .sun-editor .se-submenu {
        overflow-x: hidden;
        overflow-y: auto
    }

    .sun-editor .se-menu-container {
        overflow-x: unset;
        overflow-y: unset
    }

    .sun-editor .se-list-layer {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        height: auto;
        z-index: 5;
        border: 1px solid #bababa;
        border-radius: 4px;
        padding: 6px 0;
        background-color: #fff;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        outline: 0 none
    }

    .sun-editor .se-list-layer .se-list-inner {
        padding: 0;
        margin: 0;
        overflow-x: initial;
        overflow-y: initial;
        overflow: visible
    }

    .sun-editor .se-list-layer button {
        margin: 0;
        width: 100%
    }

    .sun-editor .se-list-inner ul {
        width: 100%;
        padding: 0
    }

    .sun-editor .se-list-inner li>button {
        min-width: 100%;
        width: max-content
    }

    .sun-editor .se-list-inner .se-list-basic li {
        width: 100%
    }

    .sun-editor .se-list-inner .se-list-basic li button.active {
        background-color: #80bdff;
        border: 1px solid #3f9dff;
        border-left: 0;
        border-right: 0
    }

    .sun-editor .se-list-inner .se-list-basic li button.active:hover {
        background-color: #3f9dff;
        border: 1px solid #4592ff;
        border-left: 0;
        border-right: 0
    }

    .sun-editor .se-list-inner .se-list-basic li button.active:active {
        background-color: #4592ff;
        border: 1px solid #407dd1;
        border-left: 0;
        border-right: 0;
        box-shadow: inset 0 3px 5px #407dd1
    }

    .sun-editor .se-list-inner .se-list-checked li button>.se-svg {
        float: left;
        padding: 6px 6px 0 0
    }

    .sun-editor .se-list-inner .se-list-checked li button>.se-svg>svg {
        display: none
    }

    .sun-editor .se-list-inner .se-list-checked li button.se-checked {
        color: #4592ff
    }

    .sun-editor .se-list-inner .se-list-checked li button.se-checked>.se-svg>svg {
        display: block
    }

    .sun-editor .se-btn-list {
        width: 100%;
        height: auto;
        min-height: 32px;
        padding: 0 14px;
        cursor: pointer;
        font-size: 12px;
        line-height: normal;
        text-indent: 0;
        text-decoration: none;
        text-align: left
    }

    .sun-editor .se-btn-list.default_value {
        background-color: #f3f3f3;
        border-top: 1px dotted #b1b1b1;
        border-bottom: 1px dotted #b1b1b1
    }

    .sun-editor .se-btn-list:focus,
    .sun-editor .se-btn-list:hover {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-btn-list:active {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        box-shadow: inset 0 3px 5px #c1c1c1
    }

    .sun-editor .se-list-layer.se-list-font-size {
        min-width: 140px;
        max-height: 300px
    }

    .sun-editor .se-list-layer.se-list-font-family {
        min-width: 156px
    }

    .sun-editor .se-list-layer.se-list-font-family .default {
        border-bottom: 1px solid #ccc
    }

    .sun-editor .se-list-layer.se-list-line {
        width: 125px
    }

    .sun-editor .se-list-layer.se-list-line hr {
        border-width: 1px 0 0;
        height: 1px
    }

    .sun-editor .se-list-layer.se-list-align .se-list-inner {
        left: 9px
    }

    .sun-editor .se-list-layer.se-list-format {
        min-width: 156px
    }

    .sun-editor .se-list-layer.se-list-format li {
        padding: 0;
        width: 100%
    }

    .sun-editor .se-list-layer.se-list-format ul .se-btn-list {
        line-height: 100%
    }

    .sun-editor .se-list-layer.se-list-format ul .se-btn-list[data-value=h1] {
        height: 40px
    }

    .sun-editor .se-list-layer.se-list-format ul .se-btn-list[data-value=h2] {
        height: 34px
    }

    .sun-editor .se-list-layer.se-list-format ul p {
        font-size: 13px
    }

    .sun-editor .se-list-layer.se-list-format ul div {
        font-size: 13px;
        padding: 4px 2px
    }

    .sun-editor .se-list-layer.se-list-format ul h1 {
        font-size: 2em;
        font-weight: 700;
        color: #333
    }

    .sun-editor .se-list-layer.se-list-format ul h2 {
        font-size: 1.5em;
        font-weight: 700;
        color: #333
    }

    .sun-editor .se-list-layer.se-list-format ul h3 {
        font-size: 1.17em;
        font-weight: 700;
        color: #333
    }

    .sun-editor .se-list-layer.se-list-format ul h4 {
        font-size: 1em;
        font-weight: 700;
        color: #333
    }

    .sun-editor .se-list-layer.se-list-format ul h5 {
        font-size: .83em;
        font-weight: 700;
        color: #333
    }

    .sun-editor .se-list-layer.se-list-format ul h6 {
        font-size: .67em;
        font-weight: 700;
        color: #333
    }

    .sun-editor .se-list-layer.se-list-format ul blockquote {
        font-size: 13px;
        color: #999;
        height: 22px;
        margin: 0;
        background-color: transparent;
        line-height: 1.5;
        border-color: #b1b1b1;
        padding: 0 0 0 7px;
        border-left: 5px #b1b1b1;
        border-style: solid
    }

    .sun-editor .se-list-layer.se-list-format ul pre {
        font-size: 13px;
        color: #666;
        padding: 4px 11px;
        margin: 0;
        background-color: #f9f9f9;
        border: 1px solid #e1e1e1;
        border-radius: 4px
    }

    .sun-editor .se-selector-table {
        display: none;
        position: absolute;
        top: 34px;
        left: 1px;
        z-index: 5;
        padding: 5px 0;
        float: left;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
    }

    .sun-editor .se-selector-table .se-table-size {
        font-size: 18px;
        padding: 0 5px
    }

    .sun-editor .se-selector-table .se-table-size-picker {
        position: absolute !important;
        z-index: 3;
        font-size: 18px;
        width: 10em;
        height: 10em;
        cursor: pointer
    }

    .sun-editor .se-selector-table .se-table-size-highlighted {
        position: absolute !important;
        z-index: 2;
        font-size: 18px;
        width: 1em;
        height: 1em;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QTZCNzMzN0I3RUYxMUU4ODcwQ0QwMjM1NTgzRTJDNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QTZCNzMzNkI3RUYxMUU4ODcwQ0QwMjM1NTgzRTJDNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MzYyNEUxRUI3RUUxMUU4ODZGQzgwRjNBODgyNTdFOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MzYyNEUxRkI3RUUxMUU4ODZGQzgwRjNBODgyNTdFOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl0yAuwAAABBSURBVDhPY/wPBAxUAGCDGvdBeWSAeicIDTfIXREiQArYeR9hEBOEohyMGkQYjBpEGAxjg6ib+yFMygCVvMbAAABj0hwMTNeKJwAAAABJRU5ErkJggg==) repeat
    }

    .sun-editor .se-selector-table .se-table-size-unhighlighted {
        position: relative !important;
        z-index: 1;
        font-size: 18px;
        width: 10em;
        height: 10em;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAIj4+Pjp6ekKlAqjAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAR0BKhmnaJzPAAAAG0lEQVQI12NgAAOtVatWMTCohoaGUY+EmIkEAEruEzK2J7tvAAAAAElFTkSuQmCC) repeat
    }

    .sun-editor .se-selector-table .se-table-size-display {
        padding-left: 5px
    }

    .sun-editor .se-list-layer.se-table-split {
        top: 36px
    }

    .sun-editor .se-list-layer .se-selector-color {
        display: flex;
        width: max-content;
        max-width: 270px;
        height: auto;
        padding: 0;
        margin: auto
    }

    .sun-editor .se-list-layer .se-selector-color .se-color-pallet {
        width: 100%;
        height: 100%;
        padding: 0
    }

    .sun-editor .se-list-layer .se-selector-color .se-color-pallet li {
        display: flex;
        float: left;
        position: relative;
        margin: 0
    }

    .sun-editor .se-list-layer .se-selector-color .se-color-pallet button {
        display: block;
        cursor: default;
        width: 30px;
        height: 30px;
        text-indent: -9999px
    }

    .sun-editor .se-list-layer .se-selector-color .se-color-pallet button.active,
    .sun-editor .se-list-layer .se-selector-color .se-color-pallet button:focus,
    .sun-editor .se-list-layer .se-selector-color .se-color-pallet button:hover {
        border: 3px solid #fff
    }

    .sun-editor .se-form-group {
        display: flex;
        width: 100%;
        min-height: 40px;
        height: auto;
        padding: 4px
    }

    .sun-editor .se-form-group input {
        flex: auto;
        display: inline-block;
        width: auto;
        height: 33px;
        font-size: 12px;
        margin: 1px 0;
        padding: 0;
        border-radius: .25rem;
        border: 1px solid #ccc
    }

    .sun-editor .se-form-group button,
    .sun-editor .se-submenu-form-group button {
        float: right;
        width: 34px;
        height: 34px;
        margin: 0 2px !important
    }

    .sun-editor .se-form-group button.se-btn {
        border: 1px solid #ccc
    }

    .sun-editor .se-form-group>div {
        position: relative
    }

    .sun-editor .se-form-group label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700
    }

    .sun-editor .se-form-group-label {
        width: 100%;
        height: auto;
        padding: 0 4px
    }

    .sun-editor .se-form-group-label label {
        font-size: 13px;
        font-weight: 700
    }

    .sun-editor .se-submenu .se-form-group input {
        width: auto;
        height: 33px;
        color: #555
    }

    .sun-editor .se-submenu .se-form-group .se-color-input {
        width: 72px;
        text-transform: uppercase;
        border: none;
        border-bottom: 2px solid #b1b1b1;
        outline: none
    }

    .sun-editor .se-submenu .se-form-group .se-color-input:focus {
        border-bottom: 3px solid #b1b1b1
    }

    .sun-editor .se-wrapper {
        position: relative !important;
        width: 100%;
        height: auto;
        overflow: hidden;
        z-index: 1
    }

    .sun-editor .se-wrapper .se-wrapper-inner {
        width: 100%;
        height: 100%;
        min-height: 65px;
        overflow-y: auto;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        user-select: auto;
        -o-user-select: auto;
        -moz-user-select: auto;
        -khtml-user-select: auto;
        -webkit-user-select: auto;
        -ms-user-select: auto
    }

    .sun-editor .se-wrapper .se-wrapper-inner:focus {
        outline: none
    }

    .sun-editor .se-wrapper .se-wrapper-code {
        background-color: #191919;
        color: #fff;
        font-size: 13px;
        word-break: break-all;
        padding: 4px;
        margin: 0;
        resize: none !important
    }

    .sun-editor .se-wrapper .se-wrapper-wysiwyg {
        display: block
    }

    .sun-editor .se-wrapper .se-wrapper-code-mirror {
        font-size: 13px
    }

    .sun-editor .se-wrapper .se-placeholder {
        position: absolute;
        display: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        z-index: 1;
        color: #b1b1b1;
        font-size: 13px;
        line-height: 1.5;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        margin-top: 0;
        padding-top: 16px;
        padding-left: 16px;
        margin-left: 0;
        padding-right: 16px;
        margin-right: 0;
        pointer-events: none;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden
    }

    .sun-editor .se-resizing-bar {
        display: flex;
        width: auto;
        height: auto;
        min-height: 16px;
        border-top: 1px solid #dadada;
        padding: 0 4px;
        background-color: #fafafa;
        cursor: ns-resize
    }

    .sun-editor .se-resizing-bar.se-resizing-none {
        cursor: default
    }

    .sun-editor .se-resizing-back {
        position: absolute;
        display: none;
        cursor: default;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2147483647
    }

    .sun-editor .se-resizing-bar .se-navigation {
        flex: auto;
        position: relative;
        width: auto;
        height: auto;
        color: #666;
        margin: 0;
        padding: 0;
        font-size: 10px;
        line-height: 1.5;
        background: transparent
    }

    .sun-editor .se-resizing-bar .se-char-counter-wrapper {
        flex: none;
        position: relative;
        display: block;
        width: auto;
        height: auto;
        margin: 0;
        padding: 0;
        color: #999;
        font-size: 13px;
        background: transparent
    }

    .sun-editor .se-resizing-bar .se-char-counter-wrapper.se-blink {
        color: #b94a48;
        animation: blinker .2s linear infinite
    }

    .sun-editor .se-resizing-bar .se-char-counter-wrapper .se-char-label {
        margin-right: 4px
    }

    .sun-editor .se-dialog {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2147483647
    }

    .sun-editor .se-dialog button,
    .sun-editor .se-dialog input,
    .sun-editor .se-dialog label {
        font-size: 14px;
        line-height: 1.5;
        color: #111;
        margin: 0
    }

    .sun-editor .se-dialog .se-dialog-back {
        background-color: #222;
        opacity: .5
    }

    .sun-editor .se-dialog .se-dialog-back,
    .sun-editor .se-dialog .se-dialog-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-content {
        position: relative;
        width: auto;
        max-width: 500px;
        margin: 1.75rem auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 4px;
        outline: 0;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5)
    }

    @media screen and (max-width:509px) {
        .sun-editor .se-dialog .se-dialog-inner .se-dialog-content {
            width: 100%
        }
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-content label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-content .se-btn-primary {
        display: inline-block;
        padding: 6px 12px;
        margin: 0 0 10px !important;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        border-radius: 4px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-header {
        height: 50px;
        padding: 6px 15px;
        border-bottom: 1px solid #e5e5e5
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-header .se-dialog-close {
        float: right;
        font-weight: 700;
        text-shadow: 0 1px 0 #fff;
        -webkit-appearance: none;
        filter: alpha(opacity=100);
        opacity: 1
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-header .se-modal-title {
        float: left;
        font-size: 14px;
        font-weight: 700;
        margin: 0;
        padding: 0;
        line-height: 2.5
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-body {
        position: relative;
        padding: 15px 15px 5px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form {
        margin-bottom: 10px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form-footer {
        margin-top: 10px;
        margin-bottom: 0
    }

    .sun-editor .se-dialog .se-dialog-inner input:disabled {
        background-color: #f3f3f3
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-text {
        width: 100%
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-text .size-h,
    .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-text .size-w {
        width: 70px;
        text-align: center
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-size-x {
        margin: 0 8px;
        width: 25px;
        text-align: center
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-footer {
        height: auto;
        min-height: 55px;
        padding: 10px 15px 0;
        text-align: right;
        border-top: 1px solid #e5e5e5
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-footer>div {
        float: left
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-footer>div>label {
        margin: 0 5px 0 0
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-radio {
        margin-left: 12px;
        margin-right: 6px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-check {
        margin-left: 12px;
        margin-right: 4px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form-footer .se-dialog-btn-check {
        margin-left: 0;
        margin-right: 4px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form-footer label:first-child {
        margin-right: 16px;
        margin-left: 0
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files {
        position: relative;
        display: flex;
        align-items: center
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files>input {
        flex: auto
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button {
        flex: auto;
        opacity: .8;
        border: 1px solid #ccc
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button.se-file-remove>svg {
        width: 8px;
        height: 8px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button:hover {
        background-color: #f0f0f0;
        outline: 0 none
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-dialog-form-files .se-dialog-files-edge-button:active {
        background-color: #e9e9e9;
        box-shadow: inset 0 3px 5px #d6d6d6
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-select {
        display: inline-block;
        width: auto;
        height: 34px;
        font-size: 14px;
        text-align: center;
        line-height: 1.42857143
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-control {
        display: inline-block;
        width: 70px;
        height: 34px;
        font-size: 14px;
        text-align: center;
        line-height: 1.42857143
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form {
        display: block;
        width: 100%;
        height: 34px;
        font-size: 14px;
        line-height: 1.42857143;
        padding: 0 4px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form.se-input-url {
        direction: ltr
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form.se-input-url:disabled {
        text-decoration: line-through;
        color: #999
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-video-ratio {
        width: 70px;
        margin-left: 4px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form a {
        color: #004cff
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-revert {
        border: 1px solid #ccc
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-revert:hover {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-btn-revert:active {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        box-shadow: inset 0 3px 5px #c1c1c1
    }

    .sun-editor .se-dialog-tabs {
        width: 100%;
        height: 25px;
        border-bottom: 1px solid #e5e5e5
    }

    .sun-editor .se-dialog-tabs button {
        background-color: #e5e5e5;
        border-right: 1px solid #e5e5e5;
        float: left;
        outline: none;
        padding: 2px 13px;
        transition: .3s
    }

    .sun-editor .se-dialog-tabs button:hover {
        background-color: #fff
    }

    .sun-editor .se-dialog-tabs button.active {
        background-color: #fff;
        border-bottom: 0
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-form.se-math-exp {
        resize: vertical;
        height: 14em;
        border: 1px solid #ccc;
        font-size: 13px;
        padding: 4px;
        direction: ltr
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-input-select.se-math-size {
        width: 6em;
        height: 28px;
        margin-left: 1em
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview {
        font-size: 13px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview>span {
        display: inline-block;
        box-shadow: 0 0 0 .1rem #c7deff
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview>span * {
        direction: ltr
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview>.se-math-katex-error {
        color: #b94a48;
        box-shadow: 0 0 0 .1rem #f2dede
    }

    .sun-editor .se-dialog .se-dialog-inner .se-dialog-form .se-math-preview>.se-math-katex-error svg {
        width: auto;
        height: 30px;
        color: #b94a48
    }

    .sun-editor .se-dialog .se-dialog-inner .se-link-preview {
        display: block;
        height: auto;
        max-height: 18px;
        font-size: 13px;
        font-weight: 400;
        font-family: inherit;
        color: #666;
        background-color: transparent;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: pre
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-preview-form {
        width: 100%;
        display: flex;
        margin-top: 4px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-preview-form .se-svg.se-anchor-preview-icon {
        flex: unset;
        display: none;
        line-height: 1.5;
        color: #4592ff
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-preview-form .se-link-preview {
        flex: auto;
        margin: 0
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel {
        height: 34px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel-btn {
        width: 46px;
        color: #3f9dff
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel-wrapper {
        display: flex;
        line-height: 1.5;
        padding-top: 6px
    }

    .sun-editor .se-dialog .se-dialog-inner .se-anchor-rel-preview {
        text-align: left
    }

    .sun-editor .se-controller .se-arrow.se-arrow-up {
        border-bottom-color: rgba(0, 0, 0, .25)
    }

    .sun-editor .se-controller {
        position: absolute;
        display: none;
        overflow: visible;
        z-index: 6;
        border: 1px solid rgba(0, 0, 0, .25);
        border-radius: 4px;
        text-align: start;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        word-wrap: normal;
        white-space: normal;
        background-color: #fff;
        background-clip: padding-box;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
        line-break: auto
    }

    .sun-editor .se-controller .se-btn-group {
        position: relative;
        display: flex;
        vertical-align: middle;
        padding: 2px;
        top: 0;
        left: 0
    }

    .sun-editor .se-controller .se-btn-group .se-btn-group-sub {
        left: 50%;
        min-width: auto;
        width: max-content;
        display: none
    }

    .sun-editor .se-controller .se-btn-group .se-btn-group-sub button {
        margin: 0;
        min-width: 72px
    }

    .sun-editor .se-controller .se-btn-group button {
        position: relative;
        min-height: 34px;
        height: auto;
        border: none;
        border-radius: 4px;
        margin: 1px;
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation
    }

    .sun-editor .se-controller .se-btn-group button:focus:enabled,
    .sun-editor .se-controller .se-btn-group button:hover:enabled {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-controller .se-btn-group button:active:enabled {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        box-shadow: inset 0 3px 5px #c1c1c1
    }

    .sun-editor .se-controller .se-btn-group button span {
        display: block;
        padding: 0;
        margin: 0
    }

    .sun-editor .se-controller .se-btn-group button:enabled.active {
        color: #4592ff;
        outline: 0 none
    }

    .sun-editor .se-controller .se-btn-group button:enabled.active:focus,
    .sun-editor .se-controller .se-btn-group button:enabled.active:hover {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-controller .se-btn-group button:enabled.active:active {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        box-shadow: inset 0 3px 5px #c1c1c1
    }

    .sun-editor .se-controller .se-btn-group button:enabled.on {
        background-color: #e1e1e1;
        border-color: #d1d1d1;
        outline: 0 none
    }

    .sun-editor .se-controller .se-btn-group button:enabled.on:focus,
    .sun-editor .se-controller .se-btn-group button:enabled.on:hover {
        background-color: #d1d1d1;
        border-color: #c1c1c1;
        outline: 0 none
    }

    .sun-editor .se-controller .se-btn-group button:enabled.on:active {
        background-color: #c1c1c1;
        border-color: #b1b1b1;
        box-shadow: inset 0 3px 5px #b1b1b1
    }

    .sun-editor .se-controller .se-form-group input {
        min-width: 120px
    }

    .sun-editor .se-controller-resizing {
        margin-top: -50px !important;
        padding: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.42857143
    }

    .sun-editor .se-controller-resizing .se-btn-group .se-btn-group-sub.se-resizing-align-list {
        width: 74px
    }

    .sun-editor .se-resizing-container {
        position: absolute;
        display: none;
        outline: 1px solid #3f9dff;
        background-color: transparent
    }

    .sun-editor .se-resizing-container .se-modal-resize {
        position: absolute;
        display: inline-block;
        background-color: #3f9dff;
        opacity: .3
    }

    .sun-editor .se-resizing-container .se-resize-dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%
    }

    .sun-editor .se-resizing-container .se-resize-dot>span {
        position: absolute;
        width: 7px;
        height: 7px;
        background-color: #3f9dff;
        border: 1px solid #4592ff
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.tl {
        top: -5px;
        left: -5px;
        cursor: nw-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.tr {
        top: -5px;
        right: -5px;
        cursor: ne-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.bl {
        bottom: -5px;
        left: -5px;
        cursor: sw-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.br {
        right: -5px;
        bottom: -5px;
        cursor: se-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.lw {
        left: -7px;
        bottom: 50%;
        cursor: w-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.th {
        left: 50%;
        top: -7px;
        cursor: n-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.rw {
        right: -7px;
        bottom: 50%;
        cursor: e-resize
    }

    .sun-editor .se-resizing-container .se-resize-dot>span.bh {
        right: 50%;
        bottom: -7px;
        cursor: s-resize
    }

    .sun-editor .se-resizing-container .se-resize-display {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 5px;
        margin: 5px;
        font-size: 12px;
        color: #fff;
        background-color: #333;
        border-radius: 4px
    }

    .sun-editor .se-controller-table,
    .sun-editor .se-controller-table-cell {
        width: auto
    }

    .sun-editor .se-controller-link,
    .sun-editor .se-controller-table,
    .sun-editor .se-controller-table-cell {
        padding: 0;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.42857143
    }

    .sun-editor .se-controller-link:after,
    .sun-editor .se-controller-link:before {
        box-sizing: border-box
    }

    .sun-editor .se-controller-link .link-content {
        padding: 0;
        margin: 0
    }

    .sun-editor .se-controller-link .link-content a {
        display: inline-block;
        color: #4592ff;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        margin-left: 5px
    }

    .sun-editor .se-select-list {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: auto;
        max-width: 100%;
        background-color: #fff;
        padding: 0;
        margin: 0;
        border: 1px solid #bababa;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
        outline: 0 none
    }

    .sun-editor .se-select-list .se-select-item {
        line-height: 28px;
        min-height: 28px;
        font-size: 13px;
        padding: 0 5px;
        margin: 2px 0;
        cursor: pointer
    }

    .sun-editor .se-select-list.__se_select-menu-mouse-move .se-select-item:hover,
    .sun-editor .se-select-list:not(.__se_select-menu-mouse-move) .se-select-item.active {
        background-color: #e1e1e1
    }

    .sun-editor .se-dialog-form-files .se-select-list {
        width: 100%
    }

    .sun-editor .se-file-browser {
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2147483647
    }

    .sun-editor .se-file-browser button,
    .sun-editor .se-file-browser input,
    .sun-editor .se-file-browser label {
        font-size: 14px;
        line-height: 1.5;
        color: #111;
        margin: 0
    }

    .sun-editor .se-file-browser .se-file-browser-back {
        background-color: #222;
        opacity: .5
    }

    .sun-editor .se-file-browser .se-file-browser-back,
    .sun-editor .se-file-browser .se-file-browser-inner {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0
    }

    .sun-editor .se-file-browser .se-file-browser-inner .se-file-browser-content {
        position: relative;
        width: 960px;
        max-width: 100%;
        margin: 20px auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 4px;
        outline: 0;
        box-shadow: 0 3px 9px rgba(0, 0, 0, .5)
    }

    .sun-editor .se-file-browser .se-file-browser-header {
        height: auto;
        min-height: 50px;
        padding: 6px 15px;
        border-bottom: 1px solid #e5e5e5
    }

    .sun-editor .se-file-browser .se-file-browser-header .se-file-browser-close {
        float: right;
        font-weight: 700;
        text-shadow: 0 1px 0 #fff;
        -webkit-appearance: none;
        filter: alpha(opacity=100);
        opacity: 1
    }

    .sun-editor .se-file-browser .se-file-browser-header .se-file-browser-close>svg {
        width: 12px;
        height: 12px
    }

    .sun-editor .se-file-browser .se-file-browser-header .se-file-browser-title {
        font-size: 16px;
        font-weight: 700;
        margin: 0;
        padding: 0;
        line-height: 2.2
    }

    .sun-editor .se-file-browser .se-file-browser-tags {
        display: block;
        width: 100%;
        padding: 0;
        text-align: left;
        margin: 0 -15px
    }

    .sun-editor .se-file-browser .se-file-browser-tags a {
        display: inline-block;
        background-color: #f5f5f5;
        padding: 6px 12px;
        margin: 8px 0 8px 8px;
        color: #333;
        text-decoration: none;
        border-radius: 32px;
        -moz-border-radius: 32px;
        -webkit-border-radius: 32px;
        -moz-background-clip: padding;
        background-clip: padding-box;
        cursor: pointer
    }

    .sun-editor .se-file-browser .se-file-browser-tags a:hover {
        background-color: #e1e1e1
    }

    .sun-editor .se-file-browser .se-file-browser-tags a:active {
        background-color: #d1d1d1
    }

    .sun-editor .se-file-browser .se-file-browser-tags a.on {
        background-color: #ebf3fe;
        color: #4592ff
    }

    .sun-editor .se-file-browser .se-file-browser-tags a.on:hover {
        background-color: #d8e8fe
    }

    .sun-editor .se-file-browser .se-file-browser-tags a.on:active {
        background-color: #c7deff
    }

    .sun-editor .se-file-browser .se-file-browser-body {
        position: relative;
        height: auto;
        min-height: 350px;
        padding: 20px;
        overflow-y: auto
    }

    .sun-editor .se-file-browser .se-file-browser-body .se-file-browser-list {
        position: relative;
        width: 100%
    }

    @media screen and (max-width:992px) {
        .sun-editor .se-file-browser .se-file-browser-inner .se-file-browser-content {
            width: 748px
        }
    }

    @media screen and (max-width:768px) {
        .sun-editor .se-file-browser .se-file-browser-inner .se-file-browser-content {
            width: 600px
        }
    }

    .sun-editor .se-file-browser .se-file-browser-list .se-file-item-column {
        position: relative;
        display: block;
        height: auto;
        float: left
    }

    .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-column {
        width: calc(25% - 20px);
        margin: 0 10px
    }

    @media screen and (max-width:992px) {
        .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-column {
            width: calc(33% - 20px)
        }
    }

    @media screen and (max-width:768px) {
        .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-column {
            width: calc(50% - 20px)
        }
    }

    .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img {
        position: relative;
        display: block;
        cursor: pointer;
        width: 100%;
        height: auto;
        border-radius: 4px;
        outline: 0;
        margin: 10px 0
    }

    .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img:hover {
        opacity: .8;
        box-shadow: 0 0 0 .2rem #3288ff
    }

    .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img>img {
        position: relative;
        display: block;
        width: 100%;
        border-radius: 4px;
        outline: 0;
        height: auto
    }

    .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img>.se-file-img-name {
        position: absolute;
        z-index: 1;
        font-size: 13px;
        color: #fff;
        left: 0;
        bottom: 0;
        padding: 5px 10px;
        background-color: transparent;
        width: 100%;
        height: 30px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px
    }

    .sun-editor .se-file-browser .se-file-browser-list.se-image-list .se-file-item-img>.se-file-img-name.se-file-name-back {
        background-color: #333;
        opacity: .6
    }

    .sun-editor .se-notice {
        position: absolute;
        top: 0;
        display: none;
        z-index: 7;
        width: 100%;
        height: auto;
        word-break: break-all;
        font-size: 13px;
        color: #b94a48;
        background-color: #f2dede;
        padding: 15px;
        margin: 0;
        border: 1px solid #eed3d7;
        user-select: auto;
        -o-user-select: auto;
        -moz-user-select: auto;
        -khtml-user-select: auto;
        -webkit-user-select: auto;
        -ms-user-select: auto
    }

    .sun-editor .se-notice button {
        float: right;
        padding: 7px
    }

    .sun-editor .se-tooltip {
        position: relative;
        overflow: visible
    }

    .sun-editor .se-tooltip .se-tooltip-inner {
        visibility: hidden;
        position: absolute;
        display: block;
        width: auto;
        height: auto;
        top: 120%;
        left: 50%;
        background: transparent;
        opacity: 0;
        z-index: 1;
        line-height: 1.5;
        transition: opacity .5s;
        margin: 0;
        padding: 0;
        bottom: auto;
        float: none;
        pointer-events: none;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden
    }

    .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text {
        position: relative;
        display: inline-block;
        width: auto;
        height: auto;
        left: -50%;
        font-size: .9em;
        margin: 0;
        padding: 4px 6px;
        border-radius: 2px;
        background-color: #333;
        color: #fff;
        text-align: center;
        line-height: unset;
        white-space: nowrap;
        cursor: auto
    }

    .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text:after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border: 5px solid transparent;
        border-bottom-color: #333
    }

    .sun-editor .se-tooltip:hover .se-tooltip-inner {
        visibility: visible;
        opacity: 1
    }

    .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text .se-shortcut {
        display: block !important
    }

    .sun-editor .se-tooltip .se-tooltip-inner .se-tooltip-text .se-shortcut>.se-shortcut-key {
        display: inline;
        font-weight: 700
    }

    .sun-editor.se-rtl .se-btn-tray {
        direction: rtl
    }

    .sun-editor.se-rtl .se-btn-select svg {
        margin: auto 1px
    }

    .sun-editor.se-rtl .se-btn-select .txt {
        flex: auto;
        text-align: right;
        direction: rtl
    }

    .sun-editor.se-rtl .se-btn-list {
        text-align: right
    }

    .sun-editor.se-rtl .se-btn-list>.se-list-icon {
        margin: -1px 0 0 10px
    }

    .sun-editor.se-rtl .se-menu-list:not(.se-menu-dir-fix),
    .sun-editor.se-rtl .se-menu-list:not(.se-menu-dir-fix) li {
        float: right
    }

    .sun-editor.se-rtl .se-list-layer * {
        direction: rtl
    }

    .sun-editor.se-rtl .se-list-layer.se-list-format ul blockquote {
        padding: 0 7px 0 0;
        border-right-width: 5px;
        border-left-width: 0
    }

    .sun-editor.se-rtl .se-list-layer .se-selector-color .se-color-pallet li {
        float: right
    }

    .sun-editor.se-rtl .se-list-inner .se-list-checked li button>.se-svg {
        float: right;
        padding: 6px 0 0 6px
    }

    .sun-editor.se-rtl .se-tooltip .se-tooltip-inner .se-tooltip-text,
    .sun-editor.se-rtl .se-wrapper .se-placeholder {
        direction: rtl
    }

    .sun-editor.se-rtl .se-tooltip .se-tooltip-inner .se-tooltip-text .se-shortcut {
        direction: ltr
    }

    .sun-editor.se-rtl .se-dialog * {
        direction: rtl
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-form .se-video-ratio {
        margin-left: 0;
        margin-right: 4px
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-header .se-dialog-close {
        float: left
    }

    .sun-editor.se-rtl .se-dialog-tabs button,
    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-header .se-modal-title {
        float: right
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-size-text {
        padding-right: 34px
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-footer .se-btn-primary {
        float: left
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-footer>div {
        float: right
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-footer>div>label {
        margin: 0 0 0 5px
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-dialog-form-footer label:first-child {
        margin-left: 16px;
        margin-right: 0
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-anchor-rel-preview {
        margin-left: 4px;
        text-align: right
    }

    .sun-editor.se-rtl .se-dialog .se-dialog-inner .se-anchor-rel-btn {
        float: right
    }

    .sun-editor.se-rtl .se-file-browser * {
        direction: rtl
    }

    .sun-editor.se-rtl .se-file-browser .se-file-browser-tags {
        text-align: right
    }

    .sun-editor.se-rtl .se-file-browser .se-file-browser-tags a {
        margin: 8px 8px 0
    }

    .sun-editor.se-rtl .se-file-browser .se-file-browser-header .se-file-browser-close {
        float: left
    }

    .sun-editor.se-rtl .se-controller .se-btn-group,
    .sun-editor.se-rtl .se-resizing-container .se-resize-display {
        direction: rtl
    }

    .sun-editor .se-btn-module-border.module-float-left {
        float: left
    }

    .sun-editor .se-btn-module-border.module-float-right {
        float: right
    }

    .sun-editor .se-error {
        color: #d9534f
    }

    .sun-editor input.se-error:focus,
    select.se-error:focus,
    textarea.se-error:focus {
        border: 1px solid #f2dede;
        outline: 0;
        box-shadow: 0 0 0 .2rem #eed3d7;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
    }

    .sun-editor hr.__se__solid {
        border-style: solid none none
    }

    .sun-editor hr.__se__dotted {
        border-style: dotted none none
    }

    .sun-editor hr.__se__dashed {
        border-style: dashed none none
    }

    @keyframes blinker {
        50% {
            opacity: 0
        }
    }

    @keyframes spinner {
        to {
            transform: rotate(361deg)
        }
    }

    .sun-editor-editable {
        font-family: Helvetica Neue;
        font-size: 13px;
        color: #333;
        background-color: #fff;
        line-height: 1.5;
        word-break: normal;
        word-wrap: break-word;
        padding: 16px;
        margin: 0
    }

    .sun-editor-editable * {
        box-sizing: border-box;
        font-family: inherit;
        font-size: inherit;
        color: inherit
    }

    .sun-editor-editable.se-rtl * {
        direction: rtl
    }

    .sun-editor-editable .se-component>figure {
        direction: ltr
    }

    .sun-editor-editable audio,
    .sun-editor-editable figcaption,
    .sun-editor-editable figure,
    .sun-editor-editable iframe,
    .sun-editor-editable img,
    .sun-editor-editable td,
    .sun-editor-editable th,
    .sun-editor-editable video {
        position: relative
    }

    .sun-editor-editable span {
        display: inline;
        vertical-align: baseline;
        margin: 0;
        padding: 0
    }

    .sun-editor-editable span.katex {
        display: inline-block
    }

    .sun-editor-editable span.katex * {
        direction: ltr
    }

    .sun-editor-editable a {
        color: #004cff;
        text-decoration: none
    }

    .sun-editor-editable span[style~="color:"] a {
        color: inherit
    }

    .sun-editor-editable a:focus,
    .sun-editor-editable a:hover {
        cursor: pointer;
        color: #0093ff;
        text-decoration: underline
    }

    .sun-editor-editable a.on {
        color: #0093ff;
        background-color: #e8f7ff
    }

    .sun-editor-editable pre {
        display: block;
        padding: 8px;
        margin: 0 0 10px;
        font-family: monospace;
        color: #666;
        line-height: 1.45;
        background-color: #f9f9f9;
        border: 1px solid #e1e1e1;
        border-radius: 2px;
        white-space: pre-wrap !important;
        word-wrap: break-word;
        overflow: visible
    }

    .sun-editor-editable ol {
        list-style-type: decimal
    }

    .sun-editor-editable ol,
    .sun-editor-editable ul {
        list-style-position: outside;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 40px
    }

    .sun-editor-editable ul {
        list-style-type: disc
    }

    .sun-editor-editable li {
        display: list-item;
        text-align: -webkit-match-parent;
        margin-bottom: 5px
    }

    .sun-editor-editable ol ol,
    .sun-editor-editable ol ul,
    .sun-editor-editable ul ol,
    .sun-editor-editable ul ul {
        margin: 0
    }

    .sun-editor-editable ol ol,
    .sun-editor-editable ul ol {
        list-style-type: lower-alpha
    }

    .sun-editor-editable ol ol ol,
    .sun-editor-editable ul ol ol,
    .sun-editor-editable ul ul ol {
        list-style-type: upper-roman
    }

    .sun-editor-editable ol ul,
    .sun-editor-editable ul ul {
        list-style-type: circle
    }

    .sun-editor-editable ol ol ul,
    .sun-editor-editable ol ul ul,
    .sun-editor-editable ul ul ul {
        list-style-type: square
    }

    .sun-editor-editable sub,
    .sun-editor-editable sup {
        font-size: 75%;
        line-height: 0
    }

    .sun-editor-editable sub {
        vertical-align: sub
    }

    .sun-editor-editable sup {
        vertical-align: super
    }

    .sun-editor-editable p {
        display: block;
        margin: 0 0 10px
    }

    .sun-editor-editable div {
        display: block;
        margin: 0;
        padding: 0
    }

    .sun-editor-editable blockquote {
        display: block;
        font-family: inherit;
        font-size: inherit;
        color: #999;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding: 0 5px 0 20px;
        border: solid #b1b1b1;
        border-width: 0 0 0 5px
    }

    .sun-editor-editable blockquote blockquote {
        border-color: #c1c1c1
    }

    .sun-editor-editable blockquote blockquote blockquote {
        border-color: #d1d1d1
    }

    .sun-editor-editable blockquote blockquote blockquote blockquote {
        border-color: #e1e1e1
    }

    .sun-editor-editable.se-rtl blockquote {
        padding-left: 5px;
        padding-right: 20px;
        border-left-width: 0;
        border-right-width: 5px
    }

    .sun-editor-editable h1 {
        font-size: 2em;
        margin-block-start: .67em;
        margin-block-end: .67em
    }

    .sun-editor-editable h1,
    .sun-editor-editable h2 {
        display: block;
        margin-inline-start: 0;
        margin-inline-end: 0;
        font-weight: 700
    }

    .sun-editor-editable h2 {
        font-size: 1.5em;
        margin-block-start: .83em;
        margin-block-end: .83em
    }

    .sun-editor-editable h3 {
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em
    }

    .sun-editor-editable h3,
    .sun-editor-editable h4 {
        display: block;
        margin-inline-start: 0;
        margin-inline-end: 0;
        font-weight: 700
    }

    .sun-editor-editable h4 {
        font-size: 1em;
        margin-block-start: 1.33em;
        margin-block-end: 1.33em
    }

    .sun-editor-editable h5 {
        font-size: .83em;
        margin-block-start: 1.67em;
        margin-block-end: 1.67em
    }

    .sun-editor-editable h5,
    .sun-editor-editable h6 {
        display: block;
        margin-inline-start: 0;
        margin-inline-end: 0;
        font-weight: 700
    }

    .sun-editor-editable h6 {
        font-size: .67em;
        margin-block-start: 2.33em;
        margin-block-end: 2.33em
    }

    .sun-editor-editable hr {
        display: flex;
        border-width: 1px 0 0;
        border-color: #000;
        border-image: initial;
        height: 1px
    }

    .sun-editor-editable hr.__se__solid {
        border-style: solid none none
    }

    .sun-editor-editable hr.__se__dotted {
        border-style: dotted none none
    }

    .sun-editor-editable hr.__se__dashed {
        border-style: dashed none none
    }

    .sun-editor-editable hr.on {
        border-color: #4592ff;
        box-shadow: 0 0 0 .1rem #c7deff
    }

    .sun-editor-editable table {
        display: table;
        table-layout: auto !important;
        border: 1px solid #ccc;
        width: 100%;
        max-width: 100%;
        margin: 0 0 10px;
        background-color: transparent;
        border-spacing: 0;
        border-collapse: collapse
    }

    .sun-editor-editable.se-rtl table {
        margin: 0 0 10px auto
    }

    .sun-editor-editable table thead {
        border-bottom: 2px solid #333
    }

    .sun-editor-editable table tr {
        border: 1px solid #efefef
    }

    .sun-editor-editable table th {
        background-color: #f3f3f3
    }

    .sun-editor-editable table td,
    .sun-editor-editable table th {
        border: 1px solid #e1e1e1;
        padding: .4em;
        background-clip: padding-box
    }

    .sun-editor-editable table.se-table-size-auto {
        width: auto !important
    }

    .sun-editor-editable table.se-table-size-100 {
        width: 100% !important
    }

    .sun-editor-editable table.se-table-layout-auto {
        table-layout: auto !important
    }

    .sun-editor-editable table.se-table-layout-fixed {
        table-layout: fixed !important
    }

    .sun-editor-editable table td.se-table-selected-cell,
    .sun-editor-editable table th.se-table-selected-cell {
        outline: 1px double #4592ff
    }

    .sun-editor-editable.se-disabled * {
        user-select: none;
        -o-user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none
    }

    .sun-editor-editable .se-component {
        display: flex;
        padding: 1px;
        margin: 0 0 10px
    }

    .sun-editor-editable[contenteditable=true] .se-component {
        outline: 1px dashed #e1e1e1
    }

    .sun-editor-editable[contenteditable=true] .se-component.se-component-copy {
        box-shadow: 0 0 0 .2rem #3f9dff;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
    }

    .sun-editor-editable .__se__float-left {
        float: left;
        margin-right: 4px
    }

    .sun-editor-editable .__se__float-right {
        float: right;
        margin-left: 4px
    }

    .sun-editor-editable .__se__float-center {
        float: center
    }

    .sun-editor-editable .__se__float-none {
        float: none
    }

    .sun-editor-editable audio,
    .sun-editor-editable iframe,
    .sun-editor-editable img,
    .sun-editor-editable video {
        display: block;
        margin: 0;
        padding: 0;
        width: auto;
        height: auto;
        max-width: 100%
    }

    .sun-editor-editable[contenteditable=true]:not(.se-read-only) figure:after {
        position: absolute;
        content: "";
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: default;
        display: block;
        background: transparent
    }

    .sun-editor-editable[contenteditable=true] figure a,
    .sun-editor-editable[contenteditable=true] figure iframe,
    .sun-editor-editable[contenteditable=true] figure img,
    .sun-editor-editable[contenteditable=true] figure video {
        z-index: 0
    }

    .sun-editor-editable[contenteditable=true] figure figcaption {
        display: block;
        z-index: 2
    }

    .sun-editor-editable[contenteditable=true] figure figcaption:focus {
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 .2rem #c7deff
    }

    .sun-editor-editable .se-image-container,
    .sun-editor-editable .se-video-container {
        width: auto;
        height: auto;
        max-width: 100%
    }

    .sun-editor-editable figure {
        display: block;
        outline: none;
        padding: 0;
        margin: 0
    }

    .sun-editor-editable .__se__float-center figure,
    .sun-editor-editable .__se__float-left figure,
    .sun-editor-editable .__se__float-right figure {
        margin: auto !important
    }

    .sun-editor-editable figure figcaption {
        padding: 1em .5em;
        margin: 0;
        background-color: #f9f9f9;
        outline: none
    }

    .sun-editor-editable figure figcaption p {
        line-height: 2;
        margin: 0
    }

    .sun-editor-editable .se-image-container a img {
        padding: 1px;
        margin: 1px;
        outline: 1px solid #4592ff
    }

    .sun-editor-editable .se-video-container iframe,
    .sun-editor-editable .se-video-container video {
        outline: 1px solid #9e9e9e;
        position: absolute;
        top: 0;
        left: 0;
        border: 0;
        width: 100%;
        height: 100%
    }

    .sun-editor-editable .se-video-container figure {
        left: 0;
        width: 100%;
        max-width: 100%
    }

    .sun-editor-editable audio {
        width: 300px;
        height: 54px
    }

    .sun-editor-editable audio.active {
        outline: 2px solid #80bdff
    }

    .sun-editor-editable.se-show-block div,
    .sun-editor-editable.se-show-block h1,
    .sun-editor-editable.se-show-block h2,
    .sun-editor-editable.se-show-block h3,
    .sun-editor-editable.se-show-block h4,
    .sun-editor-editable.se-show-block h5,
    .sun-editor-editable.se-show-block h6,
    .sun-editor-editable.se-show-block li,
    .sun-editor-editable.se-show-block ol,
    .sun-editor-editable.se-show-block p,
    .sun-editor-editable.se-show-block pre,
    .sun-editor-editable.se-show-block ul {
        border: 1px dashed #3f9dff !important;
        padding: 14px 8px 8px !important
    }

    .sun-editor-editable.se-show-block ol,
    .sun-editor-editable.se-show-block ul {
        border: 1px dashed #d539ff !important
    }

    .sun-editor-editable.se-show-block pre {
        border: 1px dashed #27c022 !important
    }

    .se-show-block p {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPAQMAAAAF7dc0AAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAaSURBVAjXY/j/gwGCPvxg+F4BQiAGDP1HQQByxxw0gqOzIwAAAABJRU5ErkJggg==) no-repeat
    }

    .se-show-block div {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAPAQMAAAAxlBYoAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAmSURBVAjXY/j//wcDDH+8XsHwDYi/hwNx1A8w/nYLKH4XoQYJAwCXnSgcl2MOPgAAAABJRU5ErkJggg==) no-repeat
    }

    .se-show-block h1 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAfSURBVAjXY/j/v4EBhr+9B+LzEPrDeygfhI8j1CBhAEhmJGY4Rf6uAAAAAElFTkSuQmCC) no-repeat
    }

    .se-show-block h2 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAmSURBVAjXY/j/v4EBhr+dB+LtQPy9geEDEH97D8T3gbgdoQYJAwA51iPuD2haEAAAAABJRU5ErkJggg==) no-repeat
    }

    .se-show-block h3 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j/v4EBhr+dB+LtQPy9geHDeQgN5p9HqEHCADeWI+69VG2MAAAAAElFTkSuQmCC) no-repeat
    }

    .se-show-block h4 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPAQMAAADTSA1RAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j//wADDH97DsTXIfjDdiDdDMTfIRhZHRQDAKJOJ6L+K3y7AAAAAElFTkSuQmCC) no-repeat
    }

    .se-show-block h5 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAlSURBVAjXY/j/v4EBhr+1A/F+IO5vYPiwHUh/B2IQfR6hBgkDABlWIy5uM+9GAAAAAElFTkSuQmCC) no-repeat
    }

    .se-show-block h6 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPAQMAAAA4f7ZSAAAABlBMVEWAgID////n1o2sAAAAAnRSTlP/AOW3MEoAAAAiSURBVAjXY/j/v4EBhr+dB+LtQLy/geFDP5S9HSKOrA6KAR9GIza1ptJnAAAAAElFTkSuQmCC) no-repeat
    }

    .se-show-block li {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVDhPYxgFcNDQ0PAfykQBIHEYhgoRB/BpwCfHBKWpBkaggYxQGgOgBzyQD1aLLA4TGwWDGjAwAACR3RcEU9Ui+wAAAABJRU5ErkJggg==) no-repeat
    }

    .se-show-block ol {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABHSURBVDhPYxgFcNDQ0PAfhKFcFIBLHCdA1oBNM0kGEmMAPgOZoDTVANUNxAqQvURMECADRiiNAWCagDSGGhyW4DRrMAEGBgAu0SX6WpGgjAAAAABJRU5ErkJggg==) no-repeat
    }

    .se-show-block ul {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA1SURBVDhPYxgFDA0NDf+hTBSALI5LDQgwQWmqgVEDKQcsUBoF4ItFGEBXA+QzQpmDGjAwAAA8DQ4Lni6gdAAAAABJRU5ErkJggg==) no-repeat
    }

    .sun-editor-editable .__se__p-bordered,
    .sun-editor .__se__p-bordered {
        border-top: 1px solid #b1b1b1;
        border-bottom: 1px solid #b1b1b1;
        padding: 4px 0
    }

    .sun-editor-editable .__se__p-spaced,
    .sun-editor .__se__p-spaced {
        letter-spacing: 1px
    }

    .sun-editor-editable .__se__p-neon,
    .sun-editor .__se__p-neon {
        font-weight: 200;
        font-style: italic;
        background: #000;
        color: #fff;
        padding: 6px 4px;
        border: 2px solid #fff;
        border-radius: 6px;
        text-transform: uppercase;
        animation: neonFlicker 1.5s infinite alternate
    }

    @keyframes neonFlicker {

        0%,
        19%,
        21%,
        23%,
        25%,
        54%,
        56%,
        to {
            text-shadow: -.2rem -.2rem 1rem #fff, .2rem .2rem 1rem #fff, 0 0 2px #f40, 0 0 4px #f40, 0 0 6px #f40, 0 0 8px #f40, 0 0 10px #f40;
            box-shadow: 0 0 .5px #fff, inset 0 0 .5px #fff, 0 0 2px #08f, inset 0 0 2px #08f, 0 0 4px #08f, inset 0 0 4px #08f
        }

        20%,
        24%,
        55% {
            text-shadow: none;
            box-shadow: none
        }
    }

    .sun-editor-editable .__se__t-shadow,
    .sun-editor .__se__t-shadow {
        text-shadow: -.2rem -.2rem 1rem #fff, .2rem .2rem 1rem #fff, 0 0 .2rem #999, 0 0 .4rem #888, 0 0 .6rem #777, 0 0 .8rem #666, 0 0 1rem #555
    }

    .sun-editor-editable .__se__t-code,
    .sun-editor .__se__t-code {
        font-family: monospace;
        color: #666;
        background-color: rgba(27, 31, 35, .05);
        border-radius: 6px;
        padding: .2em .4em
    }

    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9zdW5lZGl0b3IvZGlzdC9jc3Mvc3VuZWRpdG9yLm1pbi5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxVQUFVLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLDBCQUEwQixDQUFDLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyx3QkFBd0IsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLHFCQUFxQixDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLHlHQUF5RyxjQUFjLENBQUMsZUFBZSxDQUFDLDRuQkFBNG5CLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdIQUFnSCx5QkFBeUIsQ0FBQyxzQkFBc0Isc0JBQXNCLENBQUMscUJBQXFCLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLG1CQUFtQixRQUFRLENBQUMsNEJBQTRCLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyw2RUFBNkUscUJBQXFCLENBQUMsd0JBQXdCLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLHdCQUF3QixhQUFhLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsbUJBQW1CLENBQUMsMEJBQTBCLENBQUMsa0NBQWtDLENBQUMsK0JBQStCLENBQUMsZ0JBQWdCLGlCQUFpQixDQUFDLDJDQUEyQyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLHdEQUF3RCxVQUFVLENBQUMsV0FBVyxDQUFDLCtCQUErQixXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyx1Q0FBdUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FB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aUUsa0JBQWtCLENBQUMsNkRBQTZELGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQyw2Q0FBNkMsQ0FBQyx1QkFBdUIsOEJBQThCLDJIQUEySCxDQUFDLDRHQUE0RyxDQUFDLFlBQVksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsaUVBQWlFLG1JQUFtSSxDQUFDLDZEQUE2RCxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsbUNBQW1DLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLnN1bi1lZGl0b3J7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7Zm9udC1mYW1pbHk6SGVsdmV0aWNhIE5ldWU7Ym9yZGVyOjFweCBzb2xpZCAjZGFkYWRhO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjb2xvcjojMDAwO3VzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LWtodG1sLXVzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lfS5zdW4tZWRpdG9yICp7Ym94LXNpemluZzpib3JkZXItYm94Oy13ZWJraXQtdXNlci1kcmFnOm5vbmU7b3ZlcmZsb3c6dmlzaWJsZX0uc3VuLWVkaXRvci1jb21tb24gYnV0dG9uLC5zdW4tZWRpdG9yLWNvbW1vbiBpbnB1dCwuc3VuLWVkaXRvci1jb21tb24gc2VsZWN0LC5zdW4tZWRpdG9yLWNvbW1vbiB0ZXh0YXJlYXtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxLjV9LnN1bi1lZGl0b3ItY29tbW9uIGJsb2NrcXVvdGUsLnN1bi1lZGl0b3ItY29tbW9uIGJvZHksLnN1bi1lZGl0b3ItY29tbW9uIGJ1dHRvbiwuc3VuLWVkaXRvci1jb21tb24gY29kZSwuc3VuLWVkaXRvci1jb21tb24gZGQsLnN1bi1lZGl0b3ItY29tbW9uIGRpdiwuc3VuLWVkaXRvci1jb21tb24gZGwsLnN1bi1lZGl0b3ItY29tbW9uIGR0LC5zdW4tZWRpdG9yLWNvbW1vbiBmaWVsZHNldCwuc3VuLWVkaXRvci1jb21tb24gZm9ybSwuc3VuLWVkaXRvci1jb21tb24gaDEsLnN1bi1lZGl0b3ItY29tbW9uIGgyLC5zdW4tZWRpdG9yLWNvbW1vbiBoMywuc3VuLWVkaXRvci1jb21tb24gaDQsLnN1bi1lZGl0b3ItY29tbW9uIGg1LC5zdW4tZWRpdG9yLWNvbW1vbiBoNiwuc3VuLWVkaXRvci1jb21tb24gaW5wdXQsLnN1bi1lZGl0b3ItY29tbW9uIGxlZ2VuZCwuc3VuLWVkaXRvci1jb21tb24gbGksLnN1bi1lZGl0b3ItY29tbW9uIG9sLC5zdW4tZWRpdG9yLWNvbW1vbiBwLC5zdW4tZWRpdG9yLWNvbW1vbiBwcmUsLnN1bi1lZGl0b3ItY29tbW9uIHNlbGVjdCwuc3VuLWVkaXRvci1jb21tb24gdGQsLnN1bi1lZGl0b3ItY29tbW9uIHRleHRhcmVhLC5zdW4tZWRpdG9yLWNvbW1vbiB0aCwuc3VuLWVkaXRvci1jb21tb24gdWx7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowfS5zdW4tZWRpdG9yLWNvbW1vbiBkbCwuc3VuLWVkaXRvci1jb21tb24gbGksLnN1bi1lZGl0b3ItY29tbW9uIG1lbnUsLnN1bi1lZGl0b3ItY29tbW9uIG9sLC5zdW4tZWRpdG9yLWNvbW1vbiB1bHtsaXN0LXN0eWxlOm5vbmUhaW1wb3J0YW50fS5zdW4tZWRpdG9yLWNvbW1vbiBocnttYXJnaW46NnB4IDAhaW1wb3J0YW50fS5zdW4tZWRpdG9yIHRleHRhcmVhe3Jlc2l6ZTpub25lO2JvcmRlcjowO3BhZGRpbmc6MH0uc3VuLWVkaXRvciBidXR0b257Ym9yZGVyOjA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uO2N1cnNvcjpwb2ludGVyO291dGxpbmU6bm9uZX0uc3VuLWVkaXRvciBidXR0b24sLnN1bi1lZGl0b3IgaW5wdXQsLnN1bi1lZGl0b3Igc2VsZWN0LC5zdW4tZWRpdG9yIHRleHRhcmVhe3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uc3VuLWVkaXRvciBidXR0b24gc3BhbntkaXNwbGF5OmJsb2NrO21hcmdpbjowO3BhZGRpbmc6MH0uc3VuLWVkaXRvciBidXR0b24gLnR4dHtkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6MDt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LnN1bi1lZGl0b3IgYnV0dG9uICp7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy1tb3otYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW59LnN1bi1lZGl0b3Igc3Zne2ZpbGw6Y3VycmVudENvbG9yfS5zdW4tZWRpdG9yIC5zZS1zdmcsLnN1bi1lZGl0b3IgYnV0dG9uPnN2Z3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4O21hcmdpbjphdXRvO2ZpbGw6Y3VycmVudENvbG9yO2Rpc3BsYXk6YmxvY2s7dGV4dC1hbGlnbjpjZW50ZXI7ZmxvYXQ6bm9uZX0uc3VuLWVkaXRvciAuY2xvc2U+c3ZnLC5zdW4tZWRpdG9yIC5zZS1kaWFsb2ctY2xvc2U+c3Zne3dpZHRoOjEwcHg7aGVpZ2h0OjEwcHh9LnN1bi1lZGl0b3IgLnNlLWJ0bi1zZWxlY3Q+c3Zne2Zsb2F0OnJpZ2h0O3dpZHRoOjEwcHg7aGVpZ2h0OjEwcHh9LnN1bi1lZGl0b3IgLnNlLWJ0bi1saXN0Pi5zZS1saXN0LWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDttYXJnaW46LTFweCAxMHB4IDAgMDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LnN1bi1lZGl0b3IgLnNlLWxpbmUtYnJlYWtlcj5idXR0b24+c3Zne3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHh9LnN1bi1lZGl0b3IgYnV0dG9uPmk6YmVmb3Jley1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7dGV4dC1yZW5kZXJpbmc6YXV0bztmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoyfS5zdW4tZWRpdG9yIGJ1dHRvbj5bY2xhc3M9c2UtaWNvbi10ZXh0XXtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoxfS5zdW4tZWRpdG9yIC5zZS1hcnJvdywuc3VuLWVkaXRvciAuc2UtYXJyb3c6YWZ0ZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jazt3aWR0aDowO2hlaWdodDowO2JvcmRlcjoxMXB4IHNvbGlkIHRyYW5zcGFyZW50fS5zdW4tZWRpdG9yIC5zZS1hcnJvdy5zZS1hcnJvdy11cHt0b3A6LTExcHg7bGVmdDoyMHB4O21hcmdpbi1sZWZ0Oi0xMXB4O2JvcmRlci10b3Atd2lkdGg6MDtib3JkZXItYm90dG9tLWNvbG9yOiNkYWRhZGF9LnN1bi1lZGl0b3IgLnNlLWFycm93LnNlLWFycm93LXVwOmFmdGVye3RvcDoxcHg7bWFyZ2luLWxlZnQ6LTExcHg7Y29udGVudDpcIiBcIjtib3JkZXItdG9wLXdpZHRoOjA7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZmZmfS5zdW4tZWRpdG9yIC5zZS10b29sYmFyIC5zZS1hcnJvdy5zZS1hcnJvdy11cDphZnRlcntib3JkZXItYm90dG9tLWNvbG9yOiNmYWZhZmF9LnN1bi1lZGl0b3IgLnNlLWFycm93LnNlLWFycm93LWRvd257dG9wOjA7bGVmdDowO21hcmdpbi1sZWZ0Oi0xMXB4O2JvcmRlci1ib3R0b20td2lkdGg6MDtib3JkZXItdG9wLWNvbG9yOiNkYWRhZGF9LnN1bi1lZGl0b3IgLnNlLWFycm93LnNlLWFycm93LWRvd246YWZ0ZXJ7dG9wOi0xMnB4O21hcmdpbi1sZWZ0Oi0xMXB4O2NvbnRlbnQ6XCIgXCI7Ym9yZGVyLWJvdHRvbS13aWR0aDowO2JvcmRlci10b3AtY29sb3I6I2ZmZn0uc3VuLWVkaXRvciAuc2UtdG9vbGJhciAuc2UtYXJyb3cuc2UtYXJyb3ctZG93bjphZnRlcntib3JkZXItdG9wLWNvbG9yOiNmYWZhZmF9LnN1bi1lZGl0b3IgLnNlLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5zdW4tZWRpdG9yIGJ1dHRvbntjb2xvcjojMDAwfS5zdW4tZWRpdG9yIC5zZS1idG57ZmxvYXQ6bGVmdDt3aWR0aDozNHB4O2hlaWdodDozNHB4O2JvcmRlcjowO2JvcmRlci1yYWRpdXM6NHB4O21hcmdpbjoxcHghaW1wb3J0YW50O3BhZGRpbmc6MDtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoyN3B4fS5zdW4tZWRpdG9yIC5zZS1idG46ZW5hYmxlZDpmb2N1cywuc3VuLWVkaXRvciAuc2UtYnRuOmVuYWJsZWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO2JvcmRlci1jb2xvcjojZDFkMWQxO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1idG46ZW5hYmxlZDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZDFkMWQxO2JvcmRlci1jb2xvcjojYzFjMWMxOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggI2MxYzFjMTtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjYzFjMWMxfS5zdW4tZWRpdG9yIC5zZS1idG4tcHJpbWFyeXtjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6I2M3ZGVmZjtib3JkZXI6MXB4IHNvbGlkICM4MGJkZmY7Ym9yZGVyLXJhZGl1czo0cHh9LnN1bi1lZGl0b3IgLnNlLWJ0bi1wcmltYXJ5OmZvY3VzLC5zdW4tZWRpdG9yIC5zZS1idG4tcHJpbWFyeTpob3Zlcntjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6IzgwYmRmZjtib3JkZXItY29sb3I6IzNmOWRmZjtvdXRsaW5lOjAgbm9uZX0uc3VuLWVkaXRvciAuc2UtYnRuLXByaW1hcnk6YWN0aXZle2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojM2Y5ZGZmO2JvcmRlci1jb2xvcjojNDU5MmZmOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggIzQ1OTJmZjtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjNDU5MmZmfS5zdW4tZWRpdG9yIGlucHV0LC5zdW4tZWRpdG9yIHNlbGVjdCwuc3VuLWVkaXRvciB0ZXh0YXJlYXtjb2xvcjojMDAwO2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItcmFkaXVzOjRweH0uc3VuLWVkaXRvciBpbnB1dDpmb2N1cywuc3VuLWVkaXRvciBzZWxlY3Q6Zm9jdXMsLnN1bi1lZGl0b3IgdGV4dGFyZWE6Zm9jdXN7Ym9yZGVyOjFweCBzb2xpZCAjODBiZGZmO291dGxpbmU6MDstd2Via2l0LWJveC1zaGFkb3c6MCAwIDAgLjJyZW0gI2M3ZGVmZjtib3gtc2hhZG93OjAgMCAwIC4ycmVtICNjN2RlZmY7dHJhbnNpdGlvbjpib3JkZXItY29sb3IgLjE1cyBlYXNlLWluLW91dCxib3gtc2hhZG93IC4xNXMgZWFzZS1pbi1vdXR9LnN1bi1lZGl0b3IgLnNlLWJ0bjplbmFibGVkLmFjdGl2ZXtjb2xvcjojNDU5MmZmO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1idG46ZW5hYmxlZC5hY3RpdmU6Zm9jdXMsLnN1bi1lZGl0b3IgLnNlLWJ0bjplbmFibGVkLmFjdGl2ZTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTE7Ym9yZGVyLWNvbG9yOiNkMWQxZDE7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLWJ0bjplbmFibGVkLmFjdGl2ZTphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZDFkMWQxO2JvcmRlci1jb2xvcjojYzFjMWMxOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggI2MxYzFjMTtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjYzFjMWMxfS5zdW4tZWRpdG9yIC5zZS1idG46ZW5hYmxlZC5vbntiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTE7Ym9yZGVyLWNvbG9yOiNkMWQxZDE7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLWJ0bjplbmFibGVkLm9uOmZvY3VzLC5zdW4tZWRpdG9yIC5zZS1idG46ZW5hYmxlZC5vbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNkMWQxZDE7Ym9yZGVyLWNvbG9yOiNjMWMxYzE7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLWJ0bjplbmFibGVkLm9uOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNjMWMxYzE7Ym9yZGVyLWNvbG9yOiNiMWIxYjE7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjYjFiMWIxO2JveC1zaGFkb3c6aW5zZXQgMCAzcHggNXB4ICNiMWIxYjF9LnN1bi1lZGl0b3IgLnNlLWJ0bi1saXN0OmRpc2FibGVkLC5zdW4tZWRpdG9yIC5zZS1idG46ZGlzYWJsZWQsLnN1bi1lZGl0b3IgYnV0dG9uOmRpc2FibGVke2N1cnNvcjpub3QtYWxsb3dlZDtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXQ7Y29sb3I6I2JkYmRiZH0uc3VuLWVkaXRvciAuc2UtbG9hZGluZy1ib3h7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6I2ZmZjtvcGFjaXR5Oi43O2ZpbHRlcjphbHBoYShvcGFjaXR5PTcwKTt6LWluZGV4OjIxNDc0ODM2NDd9LnN1bi1lZGl0b3IgLnNlLWxvYWRpbmctYm94IC5zZS1sb2FkaW5nLWVmZmVjdHtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO3RvcDo1MCU7bGVmdDo1MCU7aGVpZ2h0OjI1cHg7d2lkdGg6MjVweDtib3JkZXItdG9wOjJweCBzb2xpZCAjMDdkO2JvcmRlci1yaWdodDoycHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czo1MCU7YW5pbWF0aW9uOnNwaW5uZXIgLjhzIGxpbmVhciBpbmZpbml0ZTttYXJnaW46LTI1cHggMCAwIC0yNXB4fS5zdW4tZWRpdG9yIC5zZS1saW5lLWJyZWFrZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjFweDtjdXJzb3I6dGV4dDtib3JkZXItdG9wOjFweCBzb2xpZCAjMzI4OGZmO3otaW5kZXg6N30uc3VuLWVkaXRvciAuc2UtbGluZS1icmVha2VyPmJ1dHRvbi5zZS1idG57cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDt0b3A6LTE1cHg7ZmxvYXQ6bm9uZTtsZWZ0Oi01MCU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgIzBjMjI0MDtvcGFjaXR5Oi42O2N1cnNvcjpwb2ludGVyfS5zdW4tZWRpdG9yIC5zZS1saW5lLWJyZWFrZXI+YnV0dG9uLnNlLWJ0bjpob3ZlcntvcGFjaXR5Oi45O2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItY29sb3I6IzA0MWIzOX0uc3VuLWVkaXRvciAuc2UtbGluZS1icmVha2VyLWNvbXBvbmVudHtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5Om5vbmU7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjMGMyMjQwO29wYWNpdHk6LjY7Ym9yZGVyLXJhZGl1czo0cHg7Y3Vyc29yOnBvaW50ZXI7ei1pbmRleDo3fS5zdW4tZWRpdG9yIC5zZS1saW5lLWJyZWFrZXItY29tcG9uZW50OmhvdmVye29wYWNpdHk6Ljl9LnN1bi1lZGl0b3IgLnNlLXRvb2xiYXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6YXV0bzt3aWR0aDoxMDAlO292ZXJmbG93OnZpc2libGU7cGFkZGluZzowO21hcmdpbjowO2JhY2tncm91bmQtY29sb3I6I2ZhZmFmYTtvdXRsaW5lOjFweCBzb2xpZCAjZGFkYWRhO3otaW5kZXg6NX0uc3VuLWVkaXRvciAuc2UtdG9vbGJhci1zaGFkb3d7ZGlzcGxheTpibG9jayFpbXBvcnRhbnQ7aGVpZ2h0OjAhaW1wb3J0YW50O3BhZGRpbmc6MCFpbXBvcnRhbnQ7bWFyZ2luOjAhaW1wb3J0YW50O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQhaW1wb3J0YW50O291dGxpbmU6bm9uZSFpbXBvcnRhbnQ7Ym9yZGVyOm5vbmUhaW1wb3J0YW50O3otaW5kZXg6MCFpbXBvcnRhbnR9LnN1bi1lZGl0b3IgLnNlLXRvb2xiYXItY292ZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO2ZvbnQtc2l6ZTozNnB4O3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO2JhY2tncm91bmQtY29sb3I6I2ZlZmVmZTtvcGFjaXR5Oi41O2ZpbHRlcjphbHBoYShvcGFjaXR5PTUwKTtjdXJzb3I6bm90LWFsbG93ZWQ7ei1pbmRleDo0fS5zdW4tZWRpdG9yIC5zZS10b29sYmFyLXNlcGFyYXRvci12ZXJ0aWNhbHtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MDt3aWR0aDowO21hcmdpbjowO3ZlcnRpY2FsLWFsaWduOnRvcH0uc3VuLWVkaXRvciAuc2UtdG9vbGJhci5zZS10b29sYmFyLWJhbGxvb24sLnN1bi1lZGl0b3IgLnNlLXRvb2xiYXIuc2UtdG9vbGJhci1pbmxpbmV7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmFic29sdXRlO2JveC1zaGFkb3c6MCAzcHggOXB4IHJnYmEoMCwwLDAsLjUpOy13ZWJraXQtYm94LXNoYWRvdzowIDNweCA5cHggcmdiYSgwLDAsMCwuNSl9LnN1bi1lZGl0b3IgLnNlLXRvb2xiYXIuc2UtdG9vbGJhci1iYWxsb29ue3otaW5kZXg6MjE0NzQ4MzY0Nzt3aWR0aDphdXRvfS5zdW4tZWRpdG9yIC5zZS10b29sYmFyLnNlLXRvb2xiYXItc3RpY2t5e3Bvc2l0aW9uOmZpeGVkO3RvcDowfS5zdW4tZWRpdG9yIC5zZS10b29sYmFyLXN0aWNreS1kdW1teXtkaXNwbGF5Om5vbmU7cG9zaXRpb246c3RhdGljO3otaW5kZXg6LTF9LnN1bi1lZGl0b3IgLnNlLWJ0bi1tb2R1bGV7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnN1bi1lZGl0b3IgLnNlLWJ0bi1tb2R1bGUtYm9yZGVye2JvcmRlcjoxcHggc29saWQgI2RhZGFkYTtib3JkZXItcmFkaXVzOjRweDttYXJnaW4tbGVmdDoxcHg7bWFyZ2luLXJpZ2h0OjFweH0uc3VuLWVkaXRvciAuc2UtYnRuLW1vZHVsZS1lbnRlcntkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjA7bWFyZ2luOjA7cGFkZGluZzowO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LnN1bi1lZGl0b3IgLnNlLXRvb2xiYXItbW9yZS1sYXllcnttYXJnaW46MCAtM3B4O2JhY2tncm91bmQtY29sb3I6I2ZhZmFmYX0uc3VuLWVkaXRvciAuc2UtdG9vbGJhci1tb3JlLWxheWVyIC5zZS1tb3JlLWxheWVye2Rpc3BsYXk6bm9uZTtib3JkZXItdG9wOjFweCBzb2xpZCAjZGFkYWRhfS5zdW4tZWRpdG9yIC5zZS10b29sYmFyLW1vcmUtbGF5ZXIgLnNlLW1vcmUtbGF5ZXIgLnNlLW1vcmUtZm9ybXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlO2hlaWdodDphdXRvO3BhZGRpbmc6NHB4IDNweCAwfS5zdW4tZWRpdG9yIC5zZS1idG4tbW9kdWxlIC5zZS1idG4tbW9yZS5zZS1idG4tbW9yZS10ZXh0e3dpZHRoOmF1dG87cGFkZGluZzowIDRweH0uc3VuLWVkaXRvciAuc2UtYnRuLW1vZHVsZSAuc2UtYnRuLW1vcmU6Zm9jdXMsLnN1bi1lZGl0b3IgLnNlLWJ0bi1tb2R1bGUgLnNlLWJ0bi1tb3JlOmhvdmVye2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjojZDFkMWQxO2JvcmRlci1jb2xvcjojYzFjMWMxO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1idG4tbW9kdWxlIC5zZS1idG4tbW9yZS5vbntjb2xvcjojMzMzO2JhY2tncm91bmQtY29sb3I6I2QxZDFkMTtib3JkZXItY29sb3I6I2MxYzFjMTtvdXRsaW5lOjAgbm9uZX0uc3VuLWVkaXRvciAuc2UtYnRuLW1vZHVsZSAuc2UtYnRuLW1vcmUub246aG92ZXJ7Y29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNjMWMxYzE7Ym9yZGVyLWNvbG9yOiNiMWIxYjE7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLW1lbnUtbGlzdCwuc3VuLWVkaXRvciAuc2UtbWVudS1saXN0IGxpe2Zsb2F0OmxlZnQ7cGFkZGluZzowO21hcmdpbjowfS5zdW4tZWRpdG9yIC5zZS1tZW51LWxpc3QgbGl7cG9zaXRpb246cmVsYXRpdmV9LnN1bi1lZGl0b3IgLnNlLWJ0bi1zZWxlY3R7d2lkdGg6YXV0bztkaXNwbGF5OmZsZXg7cGFkZGluZzo0cHggNnB4fS5zdW4tZWRpdG9yIC5zZS1idG4tc2VsZWN0IC50eHR7ZmxleDphdXRvO3RleHQtYWxpZ246bGVmdH0uc3VuLWVkaXRvciAuc2UtYnRuLXNlbGVjdC5zZS1idG4tdG9vbC1mb250e3dpZHRoOjEwMHB4fS5zdW4tZWRpdG9yIC5zZS1idG4tc2VsZWN0LnNlLWJ0bi10b29sLWZvcm1hdHt3aWR0aDo4MnB4fS5zdW4tZWRpdG9yIC5zZS1idG4tc2VsZWN0LnNlLWJ0bi10b29sLXNpemV7d2lkdGg6NzhweH0uc3VuLWVkaXRvciAuc2UtYnRuLXRyYXl7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6YXV0bztwYWRkaW5nOjRweCAzcHggMDttYXJnaW46MH0uc3VuLWVkaXRvciAuc2UtbWVudS10cmF5e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDowfS5zdW4tZWRpdG9yIC5zZS1zdWJtZW51e292ZXJmbG93LXg6aGlkZGVuO292ZXJmbG93LXk6YXV0b30uc3VuLWVkaXRvciAuc2UtbWVudS1jb250YWluZXJ7b3ZlcmZsb3cteDp1bnNldDtvdmVyZmxvdy15OnVuc2V0fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVye2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OmF1dG87ei1pbmRleDo1O2JvcmRlcjoxcHggc29saWQgI2JhYmFiYTtib3JkZXItcmFkaXVzOjRweDtwYWRkaW5nOjZweCAwO2JhY2tncm91bmQtY29sb3I6I2ZmZjstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggOXB4IHJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MCAzcHggOXB4IHJnYmEoMCwwLDAsLjUpO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyIC5zZS1saXN0LWlubmVye3BhZGRpbmc6MDttYXJnaW46MDtvdmVyZmxvdy14OmluaXRpYWw7b3ZlcmZsb3cteTppbml0aWFsO292ZXJmbG93OnZpc2libGV9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIgYnV0dG9ue21hcmdpbjowO3dpZHRoOjEwMCV9LnN1bi1lZGl0b3IgLnNlLWxpc3QtaW5uZXIgdWx7d2lkdGg6MTAwJTtwYWRkaW5nOjB9LnN1bi1lZGl0b3IgLnNlLWxpc3QtaW5uZXIgbGk+YnV0dG9ue21pbi13aWR0aDoxMDAlO3dpZHRoOm1heC1jb250ZW50fS5zdW4tZWRpdG9yIC5zZS1saXN0LWlubmVyIC5zZS1saXN0LWJhc2ljIGxpe3dpZHRoOjEwMCV9LnN1bi1lZGl0b3IgLnNlLWxpc3QtaW5uZXIgLnNlLWxpc3QtYmFzaWMgbGkgYnV0dG9uLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiM4MGJkZmY7Ym9yZGVyOjFweCBzb2xpZCAjM2Y5ZGZmO2JvcmRlci1sZWZ0OjA7Ym9yZGVyLXJpZ2h0OjB9LnN1bi1lZGl0b3IgLnNlLWxpc3QtaW5uZXIgLnNlLWxpc3QtYmFzaWMgbGkgYnV0dG9uLmFjdGl2ZTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzZjlkZmY7Ym9yZGVyOjFweCBzb2xpZCAjNDU5MmZmO2JvcmRlci1sZWZ0OjA7Ym9yZGVyLXJpZ2h0OjB9LnN1bi1lZGl0b3IgLnNlLWxpc3QtaW5uZXIgLnNlLWxpc3QtYmFzaWMgbGkgYnV0dG9uLmFjdGl2ZTphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojNDU5MmZmO2JvcmRlcjoxcHggc29saWQgIzQwN2RkMTtib3JkZXItbGVmdDowO2JvcmRlci1yaWdodDowOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggIzQwN2RkMTtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjNDA3ZGQxfS5zdW4tZWRpdG9yIC5zZS1saXN0LWlubmVyIC5zZS1saXN0LWNoZWNrZWQgbGkgYnV0dG9uPi5zZS1zdmd7ZmxvYXQ6bGVmdDtwYWRkaW5nOjZweCA2cHggMCAwfS5zdW4tZWRpdG9yIC5zZS1saXN0LWlubmVyIC5zZS1saXN0LWNoZWNrZWQgbGkgYnV0dG9uPi5zZS1zdmc+c3Zne2Rpc3BsYXk6bm9uZX0uc3VuLWVkaXRvciAuc2UtbGlzdC1pbm5lciAuc2UtbGlzdC1jaGVja2VkIGxpIGJ1dHRvbi5zZS1jaGVja2Vke2NvbG9yOiM0NTkyZmZ9LnN1bi1lZGl0b3IgLnNlLWxpc3QtaW5uZXIgLnNlLWxpc3QtY2hlY2tlZCBsaSBidXR0b24uc2UtY2hlY2tlZD4uc2Utc3ZnPnN2Z3tkaXNwbGF5OmJsb2NrfS5zdW4tZWRpdG9yIC5zZS1idG4tbGlzdHt3aWR0aDoxMDAlO2hlaWdodDphdXRvO21pbi1oZWlnaHQ6MzJweDtwYWRkaW5nOjAgMTRweDtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWRlY29yYXRpb246bm9uZTt0ZXh0LWFsaWduOmxlZnR9LnN1bi1lZGl0b3IgLnNlLWJ0bi1saXN0LmRlZmF1bHRfdmFsdWV7YmFja2dyb3VuZC1jb2xvcjojZjNmM2YzO2JvcmRlci10b3A6MXB4IGRvdHRlZCAjYjFiMWIxO2JvcmRlci1ib3R0b206MXB4IGRvdHRlZCAjYjFiMWIxfS5zdW4tZWRpdG9yIC5zZS1idG4tbGlzdDpmb2N1cywuc3VuLWVkaXRvciAuc2UtYnRuLWxpc3Q6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO2JvcmRlci1jb2xvcjojZDFkMWQxO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1idG4tbGlzdDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZDFkMWQxO2JvcmRlci1jb2xvcjojYzFjMWMxOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggI2MxYzFjMTtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjYzFjMWMxfS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLWxpc3QtZm9udC1zaXple21pbi13aWR0aDoxNDBweDttYXgtaGVpZ2h0OjMwMHB4fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLWxpc3QtZm9udC1mYW1pbHl7bWluLXdpZHRoOjE1NnB4fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLWxpc3QtZm9udC1mYW1pbHkgLmRlZmF1bHR7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjY30uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWxpbmV7d2lkdGg6MTI1cHh9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1saW5lIGhye2JvcmRlci13aWR0aDoxcHggMCAwO2hlaWdodDoxcHh9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1hbGlnbiAuc2UtbGlzdC1pbm5lcntsZWZ0OjlweH0uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWZvcm1hdHttaW4td2lkdGg6MTU2cHh9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgbGl7cGFkZGluZzowO3dpZHRoOjEwMCV9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgdWwgLnNlLWJ0bi1saXN0e2xpbmUtaGVpZ2h0OjEwMCV9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgdWwgLnNlLWJ0bi1saXN0W2RhdGEtdmFsdWU9aDFde2hlaWdodDo0MHB4fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLWxpc3QtZm9ybWF0IHVsIC5zZS1idG4tbGlzdFtkYXRhLXZhbHVlPWgyXXtoZWlnaHQ6MzRweH0uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWZvcm1hdCB1bCBwe2ZvbnQtc2l6ZToxM3B4fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLWxpc3QtZm9ybWF0IHVsIGRpdntmb250LXNpemU6MTNweDtwYWRkaW5nOjRweCAycHh9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgdWwgaDF7Zm9udC1zaXplOjJlbTtmb250LXdlaWdodDo3MDA7Y29sb3I6IzMzM30uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWZvcm1hdCB1bCBoMntmb250LXNpemU6MS41ZW07Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiMzMzN9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgdWwgaDN7Zm9udC1zaXplOjEuMTdlbTtmb250LXdlaWdodDo3MDA7Y29sb3I6IzMzM30uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWZvcm1hdCB1bCBoNHtmb250LXNpemU6MWVtO2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjojMzMzfS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLWxpc3QtZm9ybWF0IHVsIGg1e2ZvbnQtc2l6ZTouODNlbTtmb250LXdlaWdodDo3MDA7Y29sb3I6IzMzM30uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWZvcm1hdCB1bCBoNntmb250LXNpemU6LjY3ZW07Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiMzMzN9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgdWwgYmxvY2txdW90ZXtmb250LXNpemU6MTNweDtjb2xvcjojOTk5O2hlaWdodDoyMnB4O21hcmdpbjowO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7bGluZS1oZWlnaHQ6MS41O2JvcmRlci1jb2xvcjojYjFiMWIxO3BhZGRpbmc6MCAwIDAgN3B4O2JvcmRlci1sZWZ0OjVweCAjYjFiMWIxO2JvcmRlci1zdHlsZTpzb2xpZH0uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllci5zZS1saXN0LWZvcm1hdCB1bCBwcmV7Zm9udC1zaXplOjEzcHg7Y29sb3I6IzY2NjtwYWRkaW5nOjRweCAxMXB4O21hcmdpbjowO2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOTtib3JkZXI6MXB4IHNvbGlkICNlMWUxZTE7Ym9yZGVyLXJhZGl1czo0cHh9LnN1bi1lZGl0b3IgLnNlLXNlbGVjdG9yLXRhYmxle2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MzRweDtsZWZ0OjFweDt6LWluZGV4OjU7cGFkZGluZzo1cHggMDtmbG9hdDpsZWZ0O21hcmdpbjoycHggMCAwO2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246bGVmdDtsaXN0LXN0eWxlOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojZmZmOy13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94O2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czo0cHg7LXdlYmtpdC1ib3gtc2hhZG93OjAgNnB4IDEycHggcmdiYSgwLDAsMCwuMTc1KTtib3gtc2hhZG93OjAgNnB4IDEycHggcmdiYSgwLDAsMCwuMTc1KX0uc3VuLWVkaXRvciAuc2Utc2VsZWN0b3ItdGFibGUgLnNlLXRhYmxlLXNpemV7Zm9udC1zaXplOjE4cHg7cGFkZGluZzowIDVweH0uc3VuLWVkaXRvciAuc2Utc2VsZWN0b3ItdGFibGUgLnNlLXRhYmxlLXNpemUtcGlja2Vye3Bvc2l0aW9uOmFic29sdXRlIWltcG9ydGFudDt6LWluZGV4OjM7Zm9udC1zaXplOjE4cHg7d2lkdGg6MTBlbTtoZWlnaHQ6MTBlbTtjdXJzb3I6cG9pbnRlcn0uc3VuLWVkaXRvciAuc2Utc2VsZWN0b3ItdGFibGUgLnNlLXRhYmxlLXNpemUtaGlnaGxpZ2h0ZWR7cG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50O3otaW5kZXg6Mjtmb250LXNpemU6MThweDt3aWR0aDoxZW07aGVpZ2h0OjFlbTtiYWNrZ3JvdW5kOnVybChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQklBQUFBU0NBWUFBQUJXem81WEFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc1FBQUE3RUFaVXJEaHNBQUFBWmRFVllkRk52Wm5SM1lYSmxBRUZrYjJKbElFbHRZV2RsVW1WaFpIbHh5V1U4QUFBREptbFVXSFJZVFV3NlkyOXRMbUZrYjJKbExuaHRjQUFBQUFBQVBEOTRjR0ZqYTJWMElHSmxaMmx1UFNMdnU3OGlJR2xrUFNKWE5VMHdUWEJEWldocFNIcHlaVk42VGxSamVtdGpPV1FpUHo0Z1BIZzZlRzF3YldWMFlTQjRiV3h1Y3pwNFBTSmhaRzlpWlRwdWN6cHRaWFJoTHlJZ2VEcDRiWEIwYXowaVFXUnZZbVVnV0UxUUlFTnZjbVVnTlM0MkxXTXhORElnTnprdU1UWXdPVEkwTENBeU1ERTNMekEzTHpFekxUQXhPakEyT2pNNUlDQWdJQ0FnSUNBaVBpQThjbVJtT2xKRVJpQjRiV3h1Y3pweVpHWTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1Rrdk1ESXZNakl0Y21SbUxYTjViblJoZUMxdWN5TWlQaUE4Y21SbU9rUmxjMk55YVhCMGFXOXVJSEprWmpwaFltOTFkRDBpSWlCNGJXeHVjenA0YlhCTlRUMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMMjF0THlJZ2VHMXNibk02YzNSU1pXWTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl6Vkhsd1pTOVNaWE52ZFhKalpWSmxaaU1pSUhodGJHNXpPbmh0Y0QwaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0x5SWdlRzF3VFUwNlJHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEbzRRVFpDTnpNek4wSTNSVVl4TVVVNE9EY3dRMFF3TWpNMU5UZ3pSVEpETnlJZ2VHMXdUVTA2U1c1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvNFFUWkNOek16TmtJM1JVWXhNVVU0T0Rjd1EwUXdNak0xTlRnelJUSkROeUlnZUcxd09rTnlaV0YwYjNKVWIyOXNQU0pCWkc5aVpTQlFhRzkwYjNOb2IzQWdRME1nTWpBeE9DQW9WMmx1Wkc5M2N5a2lQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG8wTXpZeU5FVXhSVUkzUlVVeE1VVTRPRFpHUXpnd1JqTkJPRGd5TlRkRk9TSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEbzBNell5TkVVeFJrSTNSVVV4TVVVNE9EWkdRemd3UmpOQk9EZ3lOVGRGT1NJdlBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNlVrUkdQaUE4TDNnNmVHMXdiV1YwWVQ0Z1BEOTRjR0ZqYTJWMElHVnVaRDBpY2lJL1BsMHlBdXdBQUFCQlNVUkJWRGhQWS93UEJBeFVBR0NER3ZkQmVXU0FlaWNJRFRmSVhSRWlRQXJZZVI5aEVCT0VvaHlNR2tRWWpCcEVHQXhqZzZpYit5Rk15Z0NWdk1iQUFBQmowaHdNVE5lS0p3QUFBQUJKUlU1RXJrSmdnZz09XCIpIHJlcGVhdH0uc3VuLWVkaXRvciAuc2Utc2VsZWN0b3ItdGFibGUgLnNlLXRhYmxlLXNpemUtdW5oaWdobGlnaHRlZHtwb3NpdGlvbjpyZWxhdGl2ZSFpbXBvcnRhbnQ7ei1pbmRleDoxO2ZvbnQtc2l6ZToxOHB4O3dpZHRoOjEwZW07aGVpZ2h0OjEwZW07YmFja2dyb3VuZDp1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJJQUFBQVNBZ01BQUFBcm9HYkVBQUFBQ1ZCTVZFVUFBSWo0K1BqcDZla0tsQXFqQUFBQUFYUlNUbE1BUU9iWVpnQUFBQUZpUzBkRUFJZ0ZIVWdBQUFBSmNFaFpjd0FBQ3hNQUFBc1RBUUNhbkJnQUFBQUhkRWxOUlFmWUFSMEJLaG1uYUp6UEFBQUFHMGxFUVZRSTEyTmdBQU90VmF0V01UQ29ob2FHVVkrRW1Ja0VBRXJ1RXpLMko3dHZBQUFBQUVsRlRrU3VRbUNDXCIpIHJlcGVhdH0uc3VuLWVkaXRvciAuc2Utc2VsZWN0b3ItdGFibGUgLnNlLXRhYmxlLXNpemUtZGlzcGxheXtwYWRkaW5nLWxlZnQ6NXB4fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyLnNlLXRhYmxlLXNwbGl0e3RvcDozNnB4fS5zdW4tZWRpdG9yIC5zZS1saXN0LWxheWVyIC5zZS1zZWxlY3Rvci1jb2xvcntkaXNwbGF5OmZsZXg7d2lkdGg6bWF4LWNvbnRlbnQ7bWF4LXdpZHRoOjI3MHB4O2hlaWdodDphdXRvO3BhZGRpbmc6MDttYXJnaW46YXV0b30uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllciAuc2Utc2VsZWN0b3ItY29sb3IgLnNlLWNvbG9yLXBhbGxldHt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3BhZGRpbmc6MH0uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllciAuc2Utc2VsZWN0b3ItY29sb3IgLnNlLWNvbG9yLXBhbGxldCBsaXtkaXNwbGF5OmZsZXg7ZmxvYXQ6bGVmdDtwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW46MH0uc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllciAuc2Utc2VsZWN0b3ItY29sb3IgLnNlLWNvbG9yLXBhbGxldCBidXR0b257ZGlzcGxheTpibG9jaztjdXJzb3I6ZGVmYXVsdDt3aWR0aDozMHB4O2hlaWdodDozMHB4O3RleHQtaW5kZW50Oi05OTk5cHh9LnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIgLnNlLXNlbGVjdG9yLWNvbG9yIC5zZS1jb2xvci1wYWxsZXQgYnV0dG9uLmFjdGl2ZSwuc3VuLWVkaXRvciAuc2UtbGlzdC1sYXllciAuc2Utc2VsZWN0b3ItY29sb3IgLnNlLWNvbG9yLXBhbGxldCBidXR0b246Zm9jdXMsLnN1bi1lZGl0b3IgLnNlLWxpc3QtbGF5ZXIgLnNlLXNlbGVjdG9yLWNvbG9yIC5zZS1jb2xvci1wYWxsZXQgYnV0dG9uOmhvdmVye2JvcmRlcjozcHggc29saWQgI2ZmZn0uc3VuLWVkaXRvciAuc2UtZm9ybS1ncm91cHtkaXNwbGF5OmZsZXg7d2lkdGg6MTAwJTttaW4taGVpZ2h0OjQwcHg7aGVpZ2h0OmF1dG87cGFkZGluZzo0cHh9LnN1bi1lZGl0b3IgLnNlLWZvcm0tZ3JvdXAgaW5wdXR7ZmxleDphdXRvO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOmF1dG87aGVpZ2h0OjMzcHg7Zm9udC1zaXplOjEycHg7bWFyZ2luOjFweCAwO3BhZGRpbmc6MDtib3JkZXItcmFkaXVzOi4yNXJlbTtib3JkZXI6MXB4IHNvbGlkICNjY2N9LnN1bi1lZGl0b3IgLnNlLWZvcm0tZ3JvdXAgYnV0dG9uLC5zdW4tZWRpdG9yIC5zZS1zdWJtZW51LWZvcm0tZ3JvdXAgYnV0dG9ue2Zsb2F0OnJpZ2h0O3dpZHRoOjM0cHg7aGVpZ2h0OjM0cHg7bWFyZ2luOjAgMnB4IWltcG9ydGFudH0uc3VuLWVkaXRvciAuc2UtZm9ybS1ncm91cCBidXR0b24uc2UtYnRue2JvcmRlcjoxcHggc29saWQgI2NjY30uc3VuLWVkaXRvciAuc2UtZm9ybS1ncm91cD5kaXZ7cG9zaXRpb246cmVsYXRpdmV9LnN1bi1lZGl0b3IgLnNlLWZvcm0tZ3JvdXAgbGFiZWx7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWF4LXdpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTo1cHg7Zm9udC13ZWlnaHQ6NzAwfS5zdW4tZWRpdG9yIC5zZS1mb3JtLWdyb3VwLWxhYmVse3dpZHRoOjEwMCU7aGVpZ2h0OmF1dG87cGFkZGluZzowIDRweH0uc3VuLWVkaXRvciAuc2UtZm9ybS1ncm91cC1sYWJlbCBsYWJlbHtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo3MDB9LnN1bi1lZGl0b3IgLnNlLXN1Ym1lbnUgLnNlLWZvcm0tZ3JvdXAgaW5wdXR7d2lkdGg6YXV0bztoZWlnaHQ6MzNweDtjb2xvcjojNTU1fS5zdW4tZWRpdG9yIC5zZS1zdWJtZW51IC5zZS1mb3JtLWdyb3VwIC5zZS1jb2xvci1pbnB1dHt3aWR0aDo3MnB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXI6bm9uZTtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjYjFiMWIxO291dGxpbmU6bm9uZX0uc3VuLWVkaXRvciAuc2Utc3VibWVudSAuc2UtZm9ybS1ncm91cCAuc2UtY29sb3ItaW5wdXQ6Zm9jdXN7Ym9yZGVyLWJvdHRvbTozcHggc29saWQgI2IxYjFiMX0uc3VuLWVkaXRvciAuc2Utd3JhcHBlcntwb3NpdGlvbjpyZWxhdGl2ZSFpbXBvcnRhbnQ7d2lkdGg6MTAwJTtoZWlnaHQ6YXV0bztvdmVyZmxvdzpoaWRkZW47ei1pbmRleDoxfS5zdW4tZWRpdG9yIC5zZS13cmFwcGVyIC5zZS13cmFwcGVyLWlubmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7bWluLWhlaWdodDo2NXB4O292ZXJmbG93LXk6YXV0bztvdmVyZmxvdy14OmF1dG87LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6dG91Y2g7dXNlci1zZWxlY3Q6YXV0bzstby11c2VyLXNlbGVjdDphdXRvOy1tb3otdXNlci1zZWxlY3Q6YXV0bzsta2h0bWwtdXNlci1zZWxlY3Q6YXV0bzstd2Via2l0LXVzZXItc2VsZWN0OmF1dG87LW1zLXVzZXItc2VsZWN0OmF1dG99LnN1bi1lZGl0b3IgLnNlLXdyYXBwZXIgLnNlLXdyYXBwZXItaW5uZXI6Zm9jdXN7b3V0bGluZTpub25lfS5zdW4tZWRpdG9yIC5zZS13cmFwcGVyIC5zZS13cmFwcGVyLWNvZGV7YmFja2dyb3VuZC1jb2xvcjojMTkxOTE5O2NvbG9yOiNmZmY7Zm9udC1zaXplOjEzcHg7d29yZC1icmVhazpicmVhay1hbGw7cGFkZGluZzo0cHg7bWFyZ2luOjA7cmVzaXplOm5vbmUhaW1wb3J0YW50fS5zdW4tZWRpdG9yIC5zZS13cmFwcGVyIC5zZS13cmFwcGVyLXd5c2l3eWd7ZGlzcGxheTpibG9ja30uc3VuLWVkaXRvciAuc2Utd3JhcHBlciAuc2Utd3JhcHBlci1jb2RlLW1pcnJvcntmb250LXNpemU6MTNweH0uc3VuLWVkaXRvciAuc2Utd3JhcHBlciAuc2UtcGxhY2Vob2xkZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3doaXRlLXNwYWNlOm5vd3JhcDt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3otaW5kZXg6MTtjb2xvcjojYjFiMWIxO2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjEuNTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47bWFyZ2luLXRvcDowO3BhZGRpbmctdG9wOjE2cHg7cGFkZGluZy1sZWZ0OjE2cHg7bWFyZ2luLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjE2cHg7bWFyZ2luLXJpZ2h0OjA7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy1tb3otYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW59LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWJhcntkaXNwbGF5OmZsZXg7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzttaW4taGVpZ2h0OjE2cHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2RhZGFkYTtwYWRkaW5nOjAgNHB4O2JhY2tncm91bmQtY29sb3I6I2ZhZmFmYTtjdXJzb3I6bnMtcmVzaXplfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1iYXIuc2UtcmVzaXppbmctbm9uZXtjdXJzb3I6ZGVmYXVsdH0uc3VuLWVkaXRvciAuc2UtcmVzaXppbmctYmFja3twb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5Om5vbmU7Y3Vyc29yOmRlZmF1bHQ7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ei1pbmRleDoyMTQ3NDgzNjQ3fS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1iYXIgLnNlLW5hdmlnYXRpb257ZmxleDphdXRvO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87Y29sb3I6IzY2NjttYXJnaW46MDtwYWRkaW5nOjA7Zm9udC1zaXplOjEwcHg7bGluZS1oZWlnaHQ6MS41O2JhY2tncm91bmQ6dHJhbnNwYXJlbnR9LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWJhciAuc2UtY2hhci1jb3VudGVyLXdyYXBwZXJ7ZmxleDpub25lO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzttYXJnaW46MDtwYWRkaW5nOjA7Y29sb3I6Izk5OTtmb250LXNpemU6MTNweDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50fS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1iYXIgLnNlLWNoYXItY291bnRlci13cmFwcGVyLnNlLWJsaW5re2NvbG9yOiNiOTRhNDg7YW5pbWF0aW9uOmJsaW5rZXIgLjJzIGxpbmVhciBpbmZpbml0ZX0uc3VuLWVkaXRvciAuc2UtcmVzaXppbmctYmFyIC5zZS1jaGFyLWNvdW50ZXItd3JhcHBlciAuc2UtY2hhci1sYWJlbHttYXJnaW4tcmlnaHQ6NHB4fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2d7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MjE0NzQ4MzY0N30uc3VuLWVkaXRvciAuc2UtZGlhbG9nIGJ1dHRvbiwuc3VuLWVkaXRvciAuc2UtZGlhbG9nIGlucHV0LC5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgbGFiZWx7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS41O2NvbG9yOiMxMTE7bWFyZ2luOjB9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWJhY2t7YmFja2dyb3VuZC1jb2xvcjojMjIyO29wYWNpdHk6LjV9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWJhY2ssLnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVye3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWNvbnRlbnR7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6YXV0bzttYXgtd2lkdGg6NTAwcHg7bWFyZ2luOjEuNzVyZW0gYXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7YmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94O2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMik7Ym9yZGVyLXJhZGl1czo0cHg7b3V0bGluZTowOy13ZWJraXQtYm94LXNoYWRvdzowIDNweCA5cHggcmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowIDNweCA5cHggcmdiYSgwLDAsMCwuNSl9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1MDlweCl7LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctY29udGVudHt3aWR0aDoxMDAlfX0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1jb250ZW50IGxhYmVse2Rpc3BsYXk6aW5saW5lLWJsb2NrO21heC13aWR0aDoxMDAlO21hcmdpbi1ib3R0b206NXB4O2ZvbnQtd2VpZ2h0OjcwMH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1jb250ZW50IC5zZS1idG4tcHJpbWFyeXtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjZweCAxMnB4O21hcmdpbjowIDAgMTBweCFpbXBvcnRhbnQ7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstbXMtdG91Y2gtYWN0aW9uOm1hbmlwdWxhdGlvbjt0b3VjaC1hY3Rpb246bWFuaXB1bGF0aW9uO2JvcmRlci1yYWRpdXM6NHB4fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWhlYWRlcntoZWlnaHQ6NTBweDtwYWRkaW5nOjZweCAxNXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTV9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctaGVhZGVyIC5zZS1kaWFsb2ctY2xvc2V7ZmxvYXQ6cmlnaHQ7Zm9udC13ZWlnaHQ6NzAwO3RleHQtc2hhZG93OjAgMXB4IDAgI2ZmZjstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTtmaWx0ZXI6YWxwaGEob3BhY2l0eT0xMDApO29wYWNpdHk6MX0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1oZWFkZXIgLnNlLW1vZGFsLXRpdGxle2Zsb2F0OmxlZnQ7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbjowO3BhZGRpbmc6MDtsaW5lLWhlaWdodDoyLjV9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctYm9keXtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjE1cHggMTVweCA1cHh9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybXttYXJnaW4tYm90dG9tOjEwcHh9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybS1mb290ZXJ7bWFyZ2luLXRvcDoxMHB4O21hcmdpbi1ib3R0b206MH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgaW5wdXQ6ZGlzYWJsZWR7YmFja2dyb3VuZC1jb2xvcjojZjNmM2YzfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLXNpemUtdGV4dHt3aWR0aDoxMDAlfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLXNpemUtdGV4dCAuc2l6ZS1oLC5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLXNpemUtdGV4dCAuc2l6ZS13e3dpZHRoOjcwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctc2l6ZS14e21hcmdpbjowIDhweDt3aWR0aDoyNXB4O3RleHQtYWxpZ246Y2VudGVyfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvb3RlcntoZWlnaHQ6YXV0bzttaW4taGVpZ2h0OjU1cHg7cGFkZGluZzoxMHB4IDE1cHggMDt0ZXh0LWFsaWduOnJpZ2h0O2JvcmRlci10b3A6MXB4IHNvbGlkICNlNWU1ZTV9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9vdGVyPmRpdntmbG9hdDpsZWZ0fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvb3Rlcj5kaXY+bGFiZWx7bWFyZ2luOjAgNXB4IDAgMH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1idG4tcmFkaW97bWFyZ2luLWxlZnQ6MTJweDttYXJnaW4tcmlnaHQ6NnB4fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWJ0bi1jaGVja3ttYXJnaW4tbGVmdDoxMnB4O21hcmdpbi1yaWdodDo0cHh9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybS1mb290ZXIgLnNlLWRpYWxvZy1idG4tY2hlY2t7bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6NHB4fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0tZm9vdGVyIGxhYmVsOmZpcnN0LWNoaWxke21hcmdpbi1yaWdodDoxNnB4O21hcmdpbi1sZWZ0OjB9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtZGlhbG9nLWZvcm0tZmlsZXN7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1mb3JtIC5zZS1kaWFsb2ctZm9ybS1maWxlcz5pbnB1dHtmbGV4OmF1dG99LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtZGlhbG9nLWZvcm0tZmlsZXMgLnNlLWRpYWxvZy1maWxlcy1lZGdlLWJ1dHRvbntmbGV4OmF1dG87b3BhY2l0eTouODtib3JkZXI6MXB4IHNvbGlkICNjY2N9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtZGlhbG9nLWZvcm0tZmlsZXMgLnNlLWRpYWxvZy1maWxlcy1lZGdlLWJ1dHRvbi5zZS1maWxlLXJlbW92ZT5zdmd7d2lkdGg6OHB4O2hlaWdodDo4cHh9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtZGlhbG9nLWZvcm0tZmlsZXMgLnNlLWRpYWxvZy1maWxlcy1lZGdlLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmMGYwZjA7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtZGlhbG9nLWZvcm0tZmlsZXMgLnNlLWRpYWxvZy1maWxlcy1lZGdlLWJ1dHRvbjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZTllOWU5Oy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggI2Q2ZDZkNjtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjZDZkNmQ2fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0gLnNlLWlucHV0LXNlbGVjdHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDphdXRvO2hlaWdodDozNHB4O2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDN9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtaW5wdXQtY29udHJvbHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDo3MHB4O2hlaWdodDozNHB4O2ZvbnQtc2l6ZToxNHB4O3RleHQtYWxpZ246Y2VudGVyO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDN9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtaW5wdXQtZm9ybXtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7aGVpZ2h0OjM0cHg7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0MztwYWRkaW5nOjAgNHB4fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0gLnNlLWlucHV0LWZvcm0uc2UtaW5wdXQtdXJse2RpcmVjdGlvbjpsdHJ9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtaW5wdXQtZm9ybS5zZS1pbnB1dC11cmw6ZGlzYWJsZWR7dGV4dC1kZWNvcmF0aW9uOmxpbmUtdGhyb3VnaDtjb2xvcjojOTk5fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0gLnNlLXZpZGVvLXJhdGlve3dpZHRoOjcwcHg7bWFyZ2luLWxlZnQ6NHB4fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0gYXtjb2xvcjojMDA0Y2ZmfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWJ0bi1yZXZlcnR7Ym9yZGVyOjFweCBzb2xpZCAjY2NjfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWJ0bi1yZXZlcnQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO2JvcmRlci1jb2xvcjojZDFkMWQxO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWJ0bi1yZXZlcnQ6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2QxZDFkMTtib3JkZXItY29sb3I6I2MxYzFjMTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAzcHggNXB4ICNjMWMxYzE7Ym94LXNoYWRvdzppbnNldCAwIDNweCA1cHggI2MxYzFjMX0uc3VuLWVkaXRvciAuc2UtZGlhbG9nLXRhYnN7d2lkdGg6MTAwJTtoZWlnaHQ6MjVweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1fS5zdW4tZWRpdG9yIC5zZS1kaWFsb2ctdGFicyBidXR0b257YmFja2dyb3VuZC1jb2xvcjojZTVlNWU1O2JvcmRlci1yaWdodDoxcHggc29saWQgI2U1ZTVlNTtmbG9hdDpsZWZ0O291dGxpbmU6bm9uZTtwYWRkaW5nOjJweCAxM3B4O3RyYW5zaXRpb246LjNzfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2ctdGFicyBidXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2ctdGFicyBidXR0b24uYWN0aXZle2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItYm90dG9tOjB9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtaW5wdXQtZm9ybS5zZS1tYXRoLWV4cHtyZXNpemU6dmVydGljYWw7aGVpZ2h0OjE0ZW07Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2ZvbnQtc2l6ZToxM3B4O3BhZGRpbmc6NHB4O2RpcmVjdGlvbjpsdHJ9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtaW5wdXQtc2VsZWN0LnNlLW1hdGgtc2l6ZXt3aWR0aDo2ZW07aGVpZ2h0OjI4cHg7bWFyZ2luLWxlZnQ6MWVtfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0gLnNlLW1hdGgtcHJldmlld3tmb250LXNpemU6MTNweH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1mb3JtIC5zZS1tYXRoLXByZXZpZXc+c3BhbntkaXNwbGF5OmlubGluZS1ibG9jazstd2Via2l0LWJveC1zaGFkb3c6MCAwIDAgLjFyZW0gI2M3ZGVmZjtib3gtc2hhZG93OjAgMCAwIC4xcmVtICNjN2RlZmZ9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtbWF0aC1wcmV2aWV3PnNwYW4gKntkaXJlY3Rpb246bHRyfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvcm0gLnNlLW1hdGgtcHJldmlldz4uc2UtbWF0aC1rYXRleC1lcnJvcntjb2xvcjojYjk0YTQ4Oy13ZWJraXQtYm94LXNoYWRvdzowIDAgMCAuMXJlbSAjZjJkZWRlO2JveC1zaGFkb3c6MCAwIDAgLjFyZW0gI2YyZGVkZX0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1mb3JtIC5zZS1tYXRoLXByZXZpZXc+LnNlLW1hdGgta2F0ZXgtZXJyb3Igc3Zne3dpZHRoOmF1dG87aGVpZ2h0OjMwcHg7Y29sb3I6I2I5NGE0OH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWxpbmstcHJldmlld3tkaXNwbGF5OmJsb2NrO2hlaWdodDphdXRvO21heC1oZWlnaHQ6MThweDtmb250LXNpemU6MTNweDtmb250LXdlaWdodDo0MDA7Zm9udC1mYW1pbHk6aW5oZXJpdDtjb2xvcjojNjY2O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d29yZC1icmVhazpicmVhay1hbGw7d2hpdGUtc3BhY2U6cHJlfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtYW5jaG9yLXByZXZpZXctZm9ybXt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDttYXJnaW4tdG9wOjRweH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWFuY2hvci1wcmV2aWV3LWZvcm0gLnNlLXN2Zy5zZS1hbmNob3ItcHJldmlldy1pY29ue2ZsZXg6dW5zZXQ7ZGlzcGxheTpub25lO2xpbmUtaGVpZ2h0OjEuNTtjb2xvcjojNDU5MmZmfS5zdW4tZWRpdG9yIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtYW5jaG9yLXByZXZpZXctZm9ybSAuc2UtbGluay1wcmV2aWV3e2ZsZXg6YXV0bzttYXJnaW46MH0uc3VuLWVkaXRvciAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWFuY2hvci1yZWx7aGVpZ2h0OjM0cHh9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1hbmNob3ItcmVsLWJ0bnt3aWR0aDo0NnB4O2NvbG9yOiMzZjlkZmZ9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1hbmNob3ItcmVsLXdyYXBwZXJ7ZGlzcGxheTpmbGV4O2xpbmUtaGVpZ2h0OjEuNTtwYWRkaW5nLXRvcDo2cHh9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1hbmNob3ItcmVsLXByZXZpZXd7dGV4dC1hbGlnbjpsZWZ0fS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyIC5zZS1hcnJvdy5zZS1hcnJvdy11cHtib3JkZXItYm90dG9tLWNvbG9yOnJnYmEoMCwwLDAsLjI1KX0uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlcntwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5Om5vbmU7b3ZlcmZsb3c6dmlzaWJsZTt6LWluZGV4OjY7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4yNSk7Ym9yZGVyLXJhZGl1czo0cHg7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb246bm9uZTt0ZXh0LXNoYWRvdzpub25lO3RleHQtdHJhbnNmb3JtOm5vbmU7bGV0dGVyLXNwYWNpbmc6bm9ybWFsO3dvcmQtYnJlYWs6bm9ybWFsO3dvcmQtc3BhY2luZzpub3JtYWw7d29yZC13cmFwOm5vcm1hbDt3aGl0ZS1zcGFjZTpub3JtYWw7YmFja2dyb3VuZC1jb2xvcjojZmZmOy13ZWJraXQtYmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94O2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDstd2Via2l0LWJveC1zaGFkb3c6MCA1cHggMTBweCByZ2JhKDAsMCwwLC4yKTtib3gtc2hhZG93OjAgNXB4IDEwcHggcmdiYSgwLDAsMCwuMik7bGluZS1icmVhazphdXRvfS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyIC5zZS1idG4tZ3JvdXB7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpmbGV4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwYWRkaW5nOjJweDt0b3A6MDtsZWZ0OjB9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCAuc2UtYnRuLWdyb3VwLXN1YntsZWZ0OjUwJTttaW4td2lkdGg6YXV0bzt3aWR0aDptYXgtY29udGVudDtkaXNwbGF5Om5vbmV9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCAuc2UtYnRuLWdyb3VwLXN1YiBidXR0b257bWFyZ2luOjA7bWluLXdpZHRoOjcycHh9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCBidXR0b257cG9zaXRpb246cmVsYXRpdmU7bWluLWhlaWdodDozNHB4O2hlaWdodDphdXRvO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NHB4O21hcmdpbjoxcHg7cGFkZGluZzo1cHggMTBweDtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxLjU7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC13ZWlnaHQ6NDAwO3RleHQtYWxpZ246Y2VudGVyO3doaXRlLXNwYWNlOm5vd3JhcDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LW1zLXRvdWNoLWFjdGlvbjptYW5pcHVsYXRpb247dG91Y2gtYWN0aW9uOm1hbmlwdWxhdGlvbn0uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlciAuc2UtYnRuLWdyb3VwIGJ1dHRvbjpmb2N1czplbmFibGVkLC5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyIC5zZS1idG4tZ3JvdXAgYnV0dG9uOmhvdmVyOmVuYWJsZWR7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO2JvcmRlci1jb2xvcjojZDFkMWQxO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyIC5zZS1idG4tZ3JvdXAgYnV0dG9uOmFjdGl2ZTplbmFibGVke2JhY2tncm91bmQtY29sb3I6I2QxZDFkMTtib3JkZXItY29sb3I6I2MxYzFjMTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAzcHggNXB4ICNjMWMxYzE7Ym94LXNoYWRvdzppbnNldCAwIDNweCA1cHggI2MxYzFjMX0uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlciAuc2UtYnRuLWdyb3VwIGJ1dHRvbiBzcGFue2Rpc3BsYXk6YmxvY2s7cGFkZGluZzowO21hcmdpbjowfS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyIC5zZS1idG4tZ3JvdXAgYnV0dG9uOmVuYWJsZWQuYWN0aXZle2NvbG9yOiM0NTkyZmY7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCBidXR0b246ZW5hYmxlZC5hY3RpdmU6Zm9jdXMsLnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCBidXR0b246ZW5hYmxlZC5hY3RpdmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO2JvcmRlci1jb2xvcjojZDFkMWQxO291dGxpbmU6MCBub25lfS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyIC5zZS1idG4tZ3JvdXAgYnV0dG9uOmVuYWJsZWQuYWN0aXZlOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNkMWQxZDE7Ym9yZGVyLWNvbG9yOiNjMWMxYzE7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjYzFjMWMxO2JveC1zaGFkb3c6aW5zZXQgMCAzcHggNXB4ICNjMWMxYzF9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCBidXR0b246ZW5hYmxlZC5vbntiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTE7Ym9yZGVyLWNvbG9yOiNkMWQxZDE7b3V0bGluZTowIG5vbmV9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWJ0bi1ncm91cCBidXR0b246ZW5hYmxlZC5vbjpmb2N1cywuc3VuLWVkaXRvciAuc2UtY29udHJvbGxlciAuc2UtYnRuLWdyb3VwIGJ1dHRvbjplbmFibGVkLm9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2QxZDFkMTtib3JkZXItY29sb3I6I2MxYzFjMTtvdXRsaW5lOjAgbm9uZX0uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlciAuc2UtYnRuLWdyb3VwIGJ1dHRvbjplbmFibGVkLm9uOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNjMWMxYzE7Ym9yZGVyLWNvbG9yOiNiMWIxYjE7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCAjYjFiMWIxO2JveC1zaGFkb3c6aW5zZXQgMCAzcHggNXB4ICNiMWIxYjF9LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXIgLnNlLWZvcm0tZ3JvdXAgaW5wdXR7bWluLXdpZHRoOjEyMHB4fS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyLXJlc2l6aW5ne21hcmdpbi10b3A6LTUwcHghaW1wb3J0YW50O3BhZGRpbmc6MDtmb250LXNpemU6MTRweDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS40Mjg1NzE0M30uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci1yZXNpemluZyAuc2UtYnRuLWdyb3VwIC5zZS1idG4tZ3JvdXAtc3ViLnNlLXJlc2l6aW5nLWFsaWduLWxpc3R7d2lkdGg6NzRweH0uc3VuLWVkaXRvciAuc2UtcmVzaXppbmctY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6bm9uZTtvdXRsaW5lOjFweCBzb2xpZCAjM2Y5ZGZmO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWNvbnRhaW5lciAuc2UtbW9kYWwtcmVzaXple3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQtY29sb3I6IzNmOWRmZjtvcGFjaXR5Oi4zfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1jb250YWluZXIgLnNlLXJlc2l6ZS1kb3R7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWNvbnRhaW5lciAuc2UtcmVzaXplLWRvdD5zcGFue3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JhY2tncm91bmQtY29sb3I6IzNmOWRmZjtib3JkZXI6MXB4IHNvbGlkICM0NTkyZmZ9LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWNvbnRhaW5lciAuc2UtcmVzaXplLWRvdD5zcGFuLnRse3RvcDotNXB4O2xlZnQ6LTVweDtjdXJzb3I6bnctcmVzaXplfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1jb250YWluZXIgLnNlLXJlc2l6ZS1kb3Q+c3Bhbi50cnt0b3A6LTVweDtyaWdodDotNXB4O2N1cnNvcjpuZS1yZXNpemV9LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWNvbnRhaW5lciAuc2UtcmVzaXplLWRvdD5zcGFuLmJse2JvdHRvbTotNXB4O2xlZnQ6LTVweDtjdXJzb3I6c3ctcmVzaXplfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1jb250YWluZXIgLnNlLXJlc2l6ZS1kb3Q+c3Bhbi5icntyaWdodDotNXB4O2JvdHRvbTotNXB4O2N1cnNvcjpzZS1yZXNpemV9LnN1bi1lZGl0b3IgLnNlLXJlc2l6aW5nLWNvbnRhaW5lciAuc2UtcmVzaXplLWRvdD5zcGFuLmx3e2xlZnQ6LTdweDtib3R0b206NTAlO2N1cnNvcjp3LXJlc2l6ZX0uc3VuLWVkaXRvciAuc2UtcmVzaXppbmctY29udGFpbmVyIC5zZS1yZXNpemUtZG90PnNwYW4udGh7bGVmdDo1MCU7dG9wOi03cHg7Y3Vyc29yOm4tcmVzaXplfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1jb250YWluZXIgLnNlLXJlc2l6ZS1kb3Q+c3Bhbi5yd3tyaWdodDotN3B4O2JvdHRvbTo1MCU7Y3Vyc29yOmUtcmVzaXplfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1jb250YWluZXIgLnNlLXJlc2l6ZS1kb3Q+c3Bhbi5iaHtyaWdodDo1MCU7Ym90dG9tOi03cHg7Y3Vyc29yOnMtcmVzaXplfS5zdW4tZWRpdG9yIC5zZS1yZXNpemluZy1jb250YWluZXIgLnNlLXJlc2l6ZS1kaXNwbGF5e3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjA7Ym90dG9tOjA7cGFkZGluZzo1cHg7bWFyZ2luOjVweDtmb250LXNpemU6MTJweDtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzMzMztib3JkZXItcmFkaXVzOjRweH0uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci10YWJsZSwuc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci10YWJsZS1jZWxse3dpZHRoOmF1dG99LnN1bi1lZGl0b3IgLnNlLWNvbnRyb2xsZXItbGluaywuc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci10YWJsZSwuc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci10YWJsZS1jZWxse3BhZGRpbmc6MDtmb250LXNpemU6MTRweDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS40Mjg1NzE0M30uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci1saW5rOmFmdGVyLC5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyLWxpbms6YmVmb3Jley13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH0uc3VuLWVkaXRvciAuc2UtY29udHJvbGxlci1saW5rIC5saW5rLWNvbnRlbnR7cGFkZGluZzowO21hcmdpbjowfS5zdW4tZWRpdG9yIC5zZS1jb250cm9sbGVyLWxpbmsgLmxpbmstY29udGVudCBhe2Rpc3BsYXk6aW5saW5lLWJsb2NrO2NvbG9yOiM0NTkyZmY7bWF4LXdpZHRoOjIwMHB4O292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7bWFyZ2luLWxlZnQ6NXB4fS5zdW4tZWRpdG9yIC5zZS1zZWxlY3QtbGlzdHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7ZGlzcGxheTpub25lO3dpZHRoOmF1dG87bWF4LXdpZHRoOjEwMCU7YmFja2dyb3VuZC1jb2xvcjojZmZmO3BhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MXB4IHNvbGlkICNiYWJhYmE7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDlweCByZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjAgM3B4IDlweCByZ2JhKDAsMCwwLC41KTtvdXRsaW5lOjAgbm9uZX0uc3VuLWVkaXRvciAuc2Utc2VsZWN0LWxpc3QgLnNlLXNlbGVjdC1pdGVte2xpbmUtaGVpZ2h0OjI4cHg7bWluLWhlaWdodDoyOHB4O2ZvbnQtc2l6ZToxM3B4O3BhZGRpbmc6MCA1cHg7bWFyZ2luOjJweCAwO2N1cnNvcjpwb2ludGVyfS5zdW4tZWRpdG9yIC5zZS1zZWxlY3QtbGlzdC5fX3NlX3NlbGVjdC1tZW51LW1vdXNlLW1vdmUgLnNlLXNlbGVjdC1pdGVtOmhvdmVyLC5zdW4tZWRpdG9yIC5zZS1zZWxlY3QtbGlzdDpub3QoLl9fc2Vfc2VsZWN0LW1lbnUtbW91c2UtbW92ZSkgLnNlLXNlbGVjdC1pdGVtLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTF9LnN1bi1lZGl0b3IgLnNlLWRpYWxvZy1mb3JtLWZpbGVzIC5zZS1zZWxlY3QtbGlzdHt3aWR0aDoxMDAlfS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3otaW5kZXg6MjE0NzQ4MzY0N30uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIGJ1dHRvbiwuc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIGlucHV0LC5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgbGFiZWx7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS41O2NvbG9yOiMxMTE7bWFyZ2luOjB9LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWJhY2t7YmFja2dyb3VuZC1jb2xvcjojMjIyO29wYWNpdHk6LjV9LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWJhY2ssLnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWlubmVye3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt0b3A6MDtsZWZ0OjB9LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWlubmVyIC5zZS1maWxlLWJyb3dzZXItY29udGVudHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo5NjBweDttYXgtd2lkdGg6MTAwJTttYXJnaW46MjBweCBhdXRvO2JhY2tncm91bmQtY29sb3I6I2ZmZjstd2Via2l0LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDtiYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4yKTtib3JkZXItcmFkaXVzOjRweDtvdXRsaW5lOjA7LXdlYmtpdC1ib3gtc2hhZG93OjAgM3B4IDlweCByZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjAgM3B4IDlweCByZ2JhKDAsMCwwLC41KX0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItaGVhZGVye2hlaWdodDphdXRvO21pbi1oZWlnaHQ6NTBweDtwYWRkaW5nOjZweCAxNXB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlNWU1ZTV9LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWhlYWRlciAuc2UtZmlsZS1icm93c2VyLWNsb3Nle2Zsb2F0OnJpZ2h0O2ZvbnQtd2VpZ2h0OjcwMDt0ZXh0LXNoYWRvdzowIDFweCAwICNmZmY7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7ZmlsdGVyOmFscGhhKG9wYWNpdHk9MTAwKTtvcGFjaXR5OjF9LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWhlYWRlciAuc2UtZmlsZS1icm93c2VyLWNsb3NlPnN2Z3t3aWR0aDoxMnB4O2hlaWdodDoxMnB4fS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci1oZWFkZXIgLnNlLWZpbGUtYnJvd3Nlci10aXRsZXtmb250LXNpemU6MTZweDtmb250LXdlaWdodDo3MDA7bWFyZ2luOjA7cGFkZGluZzowO2xpbmUtaGVpZ2h0OjIuMn0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItdGFnc3tkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7cGFkZGluZzowO3RleHQtYWxpZ246bGVmdDttYXJnaW46MCAtMTVweH0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItdGFncyBhe2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtwYWRkaW5nOjZweCAxMnB4O21hcmdpbjo4cHggMCA4cHggOHB4O2NvbG9yOiMzMzM7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Ym9yZGVyLXJhZGl1czozMnB4Oy1tb3otYm9yZGVyLXJhZGl1czozMnB4Oy13ZWJraXQtYm9yZGVyLXJhZGl1czozMnB4Oy1tb3otYmFja2dyb3VuZC1jbGlwOnBhZGRpbmc7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7YmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94O2N1cnNvcjpwb2ludGVyfS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci10YWdzIGE6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxfS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci10YWdzIGE6YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2QxZDFkMX0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItdGFncyBhLm9ue2JhY2tncm91bmQtY29sb3I6I2ViZjNmZTtjb2xvcjojNDU5MmZmfS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci10YWdzIGEub246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZDhlOGZlfS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci10YWdzIGEub246YWN0aXZle2JhY2tncm91bmQtY29sb3I6I2M3ZGVmZn0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItYm9keXtwb3NpdGlvbjpyZWxhdGl2ZTtoZWlnaHQ6YXV0bzttaW4taGVpZ2h0OjM1MHB4O3BhZGRpbmc6MjBweDtvdmVyZmxvdy15OmF1dG99LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWJvZHkgLnNlLWZpbGUtYnJvd3Nlci1saXN0e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo5OTJweCl7LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWlubmVyIC5zZS1maWxlLWJyb3dzZXItY29udGVudHt3aWR0aDo3NDhweH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjhweCl7LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWlubmVyIC5zZS1maWxlLWJyb3dzZXItY29udGVudHt3aWR0aDo2MDBweH19LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWxpc3QgLnNlLWZpbGUtaXRlbS1jb2x1bW57cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztoZWlnaHQ6YXV0bztmbG9hdDpsZWZ0fS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci1saXN0LnNlLWltYWdlLWxpc3QgLnNlLWZpbGUtaXRlbS1jb2x1bW57d2lkdGg6Y2FsYygyNSUgLSAyMHB4KTttYXJnaW46MCAxMHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6OTkycHgpey5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci1saXN0LnNlLWltYWdlLWxpc3QgLnNlLWZpbGUtaXRlbS1jb2x1bW57d2lkdGg6Y2FsYygzMyUgLSAyMHB4KX19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjhweCl7LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWxpc3Quc2UtaW1hZ2UtbGlzdCAuc2UtZmlsZS1pdGVtLWNvbHVtbnt3aWR0aDpjYWxjKDUwJSAtIDIwcHgpfX0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItbGlzdC5zZS1pbWFnZS1saXN0IC5zZS1maWxlLWl0ZW0taW1ne3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTAwJTtoZWlnaHQ6YXV0bztib3JkZXItcmFkaXVzOjRweDtvdXRsaW5lOjA7bWFyZ2luOjEwcHggMH0uc3VuLWVkaXRvciAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItbGlzdC5zZS1pbWFnZS1saXN0IC5zZS1maWxlLWl0ZW0taW1nOmhvdmVye29wYWNpdHk6Ljg7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAwIC4ycmVtICMzMjg4ZmY7Ym94LXNoYWRvdzowIDAgMCAuMnJlbSAjMzI4OGZmfS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci1saXN0LnNlLWltYWdlLWxpc3QgLnNlLWZpbGUtaXRlbS1pbWc+aW1ne3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjRweDtvdXRsaW5lOjA7aGVpZ2h0OmF1dG99LnN1bi1lZGl0b3IgLnNlLWZpbGUtYnJvd3NlciAuc2UtZmlsZS1icm93c2VyLWxpc3Quc2UtaW1hZ2UtbGlzdCAuc2UtZmlsZS1pdGVtLWltZz4uc2UtZmlsZS1pbWctbmFtZXtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjE7Zm9udC1zaXplOjEzcHg7Y29sb3I6I2ZmZjtsZWZ0OjA7Ym90dG9tOjA7cGFkZGluZzo1cHggMTBweDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O3dpZHRoOjEwMCU7aGVpZ2h0OjMwcHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NHB4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NHB4fS5zdW4tZWRpdG9yIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci1saXN0LnNlLWltYWdlLWxpc3QgLnNlLWZpbGUtaXRlbS1pbWc+LnNlLWZpbGUtaW1nLW5hbWUuc2UtZmlsZS1uYW1lLWJhY2t7YmFja2dyb3VuZC1jb2xvcjojMzMzO29wYWNpdHk6LjZ9LnN1bi1lZGl0b3IgLnNlLW5vdGljZXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtkaXNwbGF5Om5vbmU7ei1pbmRleDo3O3dpZHRoOjEwMCU7aGVpZ2h0OmF1dG87d29yZC1icmVhazpicmVhay1hbGw7Zm9udC1zaXplOjEzcHg7Y29sb3I6I2I5NGE0ODtiYWNrZ3JvdW5kLWNvbG9yOiNmMmRlZGU7cGFkZGluZzoxNXB4O21hcmdpbjowO2JvcmRlcjoxcHggc29saWQgI2VlZDNkNzt1c2VyLXNlbGVjdDphdXRvOy1vLXVzZXItc2VsZWN0OmF1dG87LW1vei11c2VyLXNlbGVjdDphdXRvOy1raHRtbC11c2VyLXNlbGVjdDphdXRvOy13ZWJraXQtdXNlci1zZWxlY3Q6YXV0bzstbXMtdXNlci1zZWxlY3Q6YXV0b30uc3VuLWVkaXRvciAuc2Utbm90aWNlIGJ1dHRvbntmbG9hdDpyaWdodDtwYWRkaW5nOjdweH0uc3VuLWVkaXRvciAuc2UtdG9vbHRpcHtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzp2aXNpYmxlfS5zdW4tZWRpdG9yIC5zZS10b29sdGlwIC5zZS10b29sdGlwLWlubmVye3Zpc2liaWxpdHk6aGlkZGVuO3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzt0b3A6MTIwJTtsZWZ0OjUwJTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O29wYWNpdHk6MDt6LWluZGV4OjE7bGluZS1oZWlnaHQ6MS41O3RyYW5zaXRpb246b3BhY2l0eSAuNXM7bWFyZ2luOjA7cGFkZGluZzowO2JvdHRvbTphdXRvO2Zsb2F0Om5vbmU7cG9pbnRlci1ldmVudHM6bm9uZTtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy1tb3otYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW59LnN1bi1lZGl0b3IgLnNlLXRvb2x0aXAgLnNlLXRvb2x0aXAtaW5uZXIgLnNlLXRvb2x0aXAtdGV4dHtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDphdXRvO2hlaWdodDphdXRvO2xlZnQ6LTUwJTtmb250LXNpemU6LjllbTttYXJnaW46MDtwYWRkaW5nOjRweCA2cHg7Ym9yZGVyLXJhZGl1czoycHg7YmFja2dyb3VuZC1jb2xvcjojMzMzO2NvbG9yOiNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7bGluZS1oZWlnaHQ6dW5zZXQ7d2hpdGUtc3BhY2U6bm93cmFwO2N1cnNvcjphdXRvfS5zdW4tZWRpdG9yIC5zZS10b29sdGlwIC5zZS10b29sdGlwLWlubmVyIC5zZS10b29sdGlwLXRleHQ6YWZ0ZXJ7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMDAlO2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi01cHg7Ym9yZGVyOjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItYm90dG9tLWNvbG9yOiMzMzN9LnN1bi1lZGl0b3IgLnNlLXRvb2x0aXA6aG92ZXIgLnNlLXRvb2x0aXAtaW5uZXJ7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MX0uc3VuLWVkaXRvciAuc2UtdG9vbHRpcCAuc2UtdG9vbHRpcC1pbm5lciAuc2UtdG9vbHRpcC10ZXh0IC5zZS1zaG9ydGN1dHtkaXNwbGF5OmJsb2NrIWltcG9ydGFudH0uc3VuLWVkaXRvciAuc2UtdG9vbHRpcCAuc2UtdG9vbHRpcC1pbm5lciAuc2UtdG9vbHRpcC10ZXh0IC5zZS1zaG9ydGN1dD4uc2Utc2hvcnRjdXQta2V5e2Rpc3BsYXk6aW5saW5lO2ZvbnQtd2VpZ2h0OjcwMH0uc3VuLWVkaXRvci5zZS1ydGwgLnNlLWJ0bi10cmF5e2RpcmVjdGlvbjpydGx9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1idG4tc2VsZWN0IHN2Z3ttYXJnaW46YXV0byAxcHh9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1idG4tc2VsZWN0IC50eHR7ZmxleDphdXRvO3RleHQtYWxpZ246cmlnaHQ7ZGlyZWN0aW9uOnJ0bH0uc3VuLWVkaXRvci5zZS1ydGwgLnNlLWJ0bi1saXN0e3RleHQtYWxpZ246cmlnaHR9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1idG4tbGlzdD4uc2UtbGlzdC1pY29ue21hcmdpbjotMXB4IDAgMCAxMHB4fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtbWVudS1saXN0Om5vdCguc2UtbWVudS1kaXItZml4KSwuc3VuLWVkaXRvci5zZS1ydGwgLnNlLW1lbnUtbGlzdDpub3QoLnNlLW1lbnUtZGlyLWZpeCkgbGl7ZmxvYXQ6cmlnaHR9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1saXN0LWxheWVyICp7ZGlyZWN0aW9uOnJ0bH0uc3VuLWVkaXRvci5zZS1ydGwgLnNlLWxpc3QtbGF5ZXIuc2UtbGlzdC1mb3JtYXQgdWwgYmxvY2txdW90ZXtwYWRkaW5nOjAgN3B4IDAgMDtib3JkZXItcmlnaHQtd2lkdGg6NXB4O2JvcmRlci1sZWZ0LXdpZHRoOjB9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1saXN0LWxheWVyIC5zZS1zZWxlY3Rvci1jb2xvciAuc2UtY29sb3ItcGFsbGV0IGxpe2Zsb2F0OnJpZ2h0fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtbGlzdC1pbm5lciAuc2UtbGlzdC1jaGVja2VkIGxpIGJ1dHRvbj4uc2Utc3Zne2Zsb2F0OnJpZ2h0O3BhZGRpbmc6NnB4IDAgMCA2cHh9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS10b29sdGlwIC5zZS10b29sdGlwLWlubmVyIC5zZS10b29sdGlwLXRleHQsLnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS13cmFwcGVyIC5zZS1wbGFjZWhvbGRlcntkaXJlY3Rpb246cnRsfS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtdG9vbHRpcCAuc2UtdG9vbHRpcC1pbm5lciAuc2UtdG9vbHRpcC10ZXh0IC5zZS1zaG9ydGN1dHtkaXJlY3Rpb246bHRyfS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZGlhbG9nICp7ZGlyZWN0aW9uOnJ0bH0uc3VuLWVkaXRvci5zZS1ydGwgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybSAuc2UtdmlkZW8tcmF0aW97bWFyZ2luLWxlZnQ6MDttYXJnaW4tcmlnaHQ6NHB4fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1oZWFkZXIgLnNlLWRpYWxvZy1jbG9zZXtmbG9hdDpsZWZ0fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZGlhbG9nLXRhYnMgYnV0dG9uLC5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1oZWFkZXIgLnNlLW1vZGFsLXRpdGxle2Zsb2F0OnJpZ2h0fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1zaXplLXRleHR7cGFkZGluZy1yaWdodDozNHB4fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZGlhbG9nIC5zZS1kaWFsb2ctaW5uZXIgLnNlLWRpYWxvZy1mb290ZXIgLnNlLWJ0bi1wcmltYXJ5e2Zsb2F0OmxlZnR9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvb3Rlcj5kaXZ7ZmxvYXQ6cmlnaHR9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtZGlhbG9nLWZvb3Rlcj5kaXY+bGFiZWx7bWFyZ2luOjAgMCAwIDVweH0uc3VuLWVkaXRvci5zZS1ydGwgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1kaWFsb2ctZm9ybS1mb290ZXIgbGFiZWw6Zmlyc3QtY2hpbGR7bWFyZ2luLWxlZnQ6MTZweDttYXJnaW4tcmlnaHQ6MH0uc3VuLWVkaXRvci5zZS1ydGwgLnNlLWRpYWxvZyAuc2UtZGlhbG9nLWlubmVyIC5zZS1hbmNob3ItcmVsLXByZXZpZXd7bWFyZ2luLWxlZnQ6NHB4O3RleHQtYWxpZ246cmlnaHR9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1kaWFsb2cgLnNlLWRpYWxvZy1pbm5lciAuc2UtYW5jaG9yLXJlbC1idG57ZmxvYXQ6cmlnaHR9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1maWxlLWJyb3dzZXIgKntkaXJlY3Rpb246cnRsfS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItdGFnc3t0ZXh0LWFsaWduOnJpZ2h0fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtZmlsZS1icm93c2VyIC5zZS1maWxlLWJyb3dzZXItdGFncyBhe21hcmdpbjo4cHggOHB4IDB9LnN1bi1lZGl0b3Iuc2UtcnRsIC5zZS1maWxlLWJyb3dzZXIgLnNlLWZpbGUtYnJvd3Nlci1oZWFkZXIgLnNlLWZpbGUtYnJvd3Nlci1jbG9zZXtmbG9hdDpsZWZ0fS5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtY29udHJvbGxlciAuc2UtYnRuLWdyb3VwLC5zdW4tZWRpdG9yLnNlLXJ0bCAuc2UtcmVzaXppbmctY29udGFpbmVyIC5zZS1yZXNpemUtZGlzcGxheXtkaXJlY3Rpb246cnRsfS5zdW4tZWRpdG9yIC5zZS1idG4tbW9kdWxlLWJvcmRlci5tb2R1bGUtZmxvYXQtbGVmdHtmbG9hdDpsZWZ0fS5zdW4tZWRpdG9yIC5zZS1idG4tbW9kdWxlLWJvcmRlci5tb2R1bGUtZmxvYXQtcmlnaHR7ZmxvYXQ6cmlnaHR9LnN1bi1lZGl0b3IgLnNlLWVycm9ye2NvbG9yOiNkOTUzNGZ9LnN1bi1lZGl0b3IgaW5wdXQuc2UtZXJyb3I6Zm9jdXMsc2VsZWN0LnNlLWVycm9yOmZvY3VzLHRleHRhcmVhLnNlLWVycm9yOmZvY3Vze2JvcmRlcjoxcHggc29saWQgI2YyZGVkZTtvdXRsaW5lOjA7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAwIC4ycmVtICNlZWQzZDc7Ym94LXNoYWRvdzowIDAgMCAuMnJlbSAjZWVkM2Q3O3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm94LXNoYWRvdyAuMTVzIGVhc2UtaW4tb3V0fS5zdW4tZWRpdG9yIGhyLl9fc2VfX3NvbGlke2JvcmRlci1zdHlsZTpzb2xpZCBub25lIG5vbmV9LnN1bi1lZGl0b3IgaHIuX19zZV9fZG90dGVke2JvcmRlci1zdHlsZTpkb3R0ZWQgbm9uZSBub25lfS5zdW4tZWRpdG9yIGhyLl9fc2VfX2Rhc2hlZHtib3JkZXItc3R5bGU6ZGFzaGVkIG5vbmUgbm9uZX1Aa2V5ZnJhbWVzIGJsaW5rZXJ7NTAle29wYWNpdHk6MH19QGtleWZyYW1lcyBzcGlubmVye3Rve3RyYW5zZm9ybTpyb3RhdGUoMzYxZGVnKX19LnN1bi1lZGl0b3ItZWRpdGFibGV7Zm9udC1mYW1pbHk6SGVsdmV0aWNhIE5ldWU7Zm9udC1zaXplOjEzcHg7Y29sb3I6IzMzMztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MS41O3dvcmQtYnJlYWs6bm9ybWFsO3dvcmQtd3JhcDpicmVhay13b3JkO3BhZGRpbmc6MTZweDttYXJnaW46MH0uc3VuLWVkaXRvci1lZGl0YWJsZSAqey13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveDtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2NvbG9yOmluaGVyaXR9LnN1bi1lZGl0b3ItZWRpdGFibGUuc2UtcnRsICp7ZGlyZWN0aW9uOnJ0bH0uc3VuLWVkaXRvci1lZGl0YWJsZSAuc2UtY29tcG9uZW50PmZpZ3VyZXtkaXJlY3Rpb246bHRyfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGF1ZGlvLC5zdW4tZWRpdG9yLWVkaXRhYmxlIGZpZ2NhcHRpb24sLnN1bi1lZGl0b3ItZWRpdGFibGUgZmlndXJlLC5zdW4tZWRpdG9yLWVkaXRhYmxlIGlmcmFtZSwuc3VuLWVkaXRvci1lZGl0YWJsZSBpbWcsLnN1bi1lZGl0b3ItZWRpdGFibGUgdGQsLnN1bi1lZGl0b3ItZWRpdGFibGUgdGgsLnN1bi1lZGl0b3ItZWRpdGFibGUgdmlkZW97cG9zaXRpb246cmVsYXRpdmV9LnN1bi1lZGl0b3ItZWRpdGFibGUgc3BhbntkaXNwbGF5OmlubGluZTt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTttYXJnaW46MDtwYWRkaW5nOjB9LnN1bi1lZGl0b3ItZWRpdGFibGUgc3Bhbi5rYXRleHtkaXNwbGF5OmlubGluZS1ibG9ja30uc3VuLWVkaXRvci1lZGl0YWJsZSBzcGFuLmthdGV4ICp7ZGlyZWN0aW9uOmx0cn0uc3VuLWVkaXRvci1lZGl0YWJsZSBhe2NvbG9yOiMwMDRjZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LnN1bi1lZGl0b3ItZWRpdGFibGUgc3BhbltzdHlsZX49XCJjb2xvcjpcIl0gYXtjb2xvcjppbmhlcml0fS5zdW4tZWRpdG9yLWVkaXRhYmxlIGE6Zm9jdXMsLnN1bi1lZGl0b3ItZWRpdGFibGUgYTpob3ZlcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojMDA5M2ZmO3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9LnN1bi1lZGl0b3ItZWRpdGFibGUgYS5vbntjb2xvcjojMDA5M2ZmO2JhY2tncm91bmQtY29sb3I6I2U4ZjdmZn0uc3VuLWVkaXRvci1lZGl0YWJsZSBwcmV7ZGlzcGxheTpibG9jaztwYWRkaW5nOjhweDttYXJnaW46MCAwIDEwcHg7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO2NvbG9yOiM2NjY7bGluZS1oZWlnaHQ6MS40NTtiYWNrZ3JvdW5kLWNvbG9yOiNmOWY5Zjk7Ym9yZGVyOjFweCBzb2xpZCAjZTFlMWUxO2JvcmRlci1yYWRpdXM6MnB4O3doaXRlLXNwYWNlOnByZS13cmFwIWltcG9ydGFudDt3b3JkLXdyYXA6YnJlYWstd29yZDtvdmVyZmxvdzp2aXNpYmxlfS5zdW4tZWRpdG9yLWVkaXRhYmxlIG9se2xpc3Qtc3R5bGUtdHlwZTpkZWNpbWFsfS5zdW4tZWRpdG9yLWVkaXRhYmxlIG9sLC5zdW4tZWRpdG9yLWVkaXRhYmxlIHVse2xpc3Qtc3R5bGUtcG9zaXRpb246b3V0c2lkZTtkaXNwbGF5OmJsb2NrO21hcmdpbi1ibG9jay1zdGFydDoxZW07bWFyZ2luLWJsb2NrLWVuZDoxZW07bWFyZ2luLWlubGluZS1zdGFydDowO21hcmdpbi1pbmxpbmUtZW5kOjA7cGFkZGluZy1pbmxpbmUtc3RhcnQ6NDBweH0uc3VuLWVkaXRvci1lZGl0YWJsZSB1bHtsaXN0LXN0eWxlLXR5cGU6ZGlzY30uc3VuLWVkaXRvci1lZGl0YWJsZSBsaXtkaXNwbGF5Omxpc3QtaXRlbTt0ZXh0LWFsaWduOi13ZWJraXQtbWF0Y2gtcGFyZW50O21hcmdpbi1ib3R0b206NXB4fS5zdW4tZWRpdG9yLWVkaXRhYmxlIG9sIG9sLC5zdW4tZWRpdG9yLWVkaXRhYmxlIG9sIHVsLC5zdW4tZWRpdG9yLWVkaXRhYmxlIHVsIG9sLC5zdW4tZWRpdG9yLWVkaXRhYmxlIHVsIHVse21hcmdpbjowfS5zdW4tZWRpdG9yLWVkaXRhYmxlIG9sIG9sLC5zdW4tZWRpdG9yLWVkaXRhYmxlIHVsIG9se2xpc3Qtc3R5bGUtdHlwZTpsb3dlci1hbHBoYX0uc3VuLWVkaXRvci1lZGl0YWJsZSBvbCBvbCBvbCwuc3VuLWVkaXRvci1lZGl0YWJsZSB1bCBvbCBvbCwuc3VuLWVkaXRvci1lZGl0YWJsZSB1bCB1bCBvbHtsaXN0LXN0eWxlLXR5cGU6dXBwZXItcm9tYW59LnN1bi1lZGl0b3ItZWRpdGFibGUgb2wgdWwsLnN1bi1lZGl0b3ItZWRpdGFibGUgdWwgdWx7bGlzdC1zdHlsZS10eXBlOmNpcmNsZX0uc3VuLWVkaXRvci1lZGl0YWJsZSBvbCBvbCB1bCwuc3VuLWVkaXRvci1lZGl0YWJsZSBvbCB1bCB1bCwuc3VuLWVkaXRvci1lZGl0YWJsZSB1bCB1bCB1bHtsaXN0LXN0eWxlLXR5cGU6c3F1YXJlfS5zdW4tZWRpdG9yLWVkaXRhYmxlIHN1Yiwuc3VuLWVkaXRvci1lZGl0YWJsZSBzdXB7Zm9udC1zaXplOjc1JTtsaW5lLWhlaWdodDowfS5zdW4tZWRpdG9yLWVkaXRhYmxlIHN1Ynt2ZXJ0aWNhbC1hbGlnbjpzdWJ9LnN1bi1lZGl0b3ItZWRpdGFibGUgc3Vwe3ZlcnRpY2FsLWFsaWduOnN1cGVyfS5zdW4tZWRpdG9yLWVkaXRhYmxlIHB7ZGlzcGxheTpibG9jazttYXJnaW46MCAwIDEwcHh9LnN1bi1lZGl0b3ItZWRpdGFibGUgZGl2e2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjA7cGFkZGluZzowfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGJsb2NrcXVvdGV7ZGlzcGxheTpibG9jaztmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2NvbG9yOiM5OTk7bWFyZ2luLWJsb2NrLXN0YXJ0OjFlbTttYXJnaW4tYmxvY2stZW5kOjFlbTttYXJnaW4taW5saW5lLXN0YXJ0OjA7bWFyZ2luLWlubGluZS1lbmQ6MDtwYWRkaW5nOjAgNXB4IDAgMjBweDtib3JkZXI6c29saWQgI2IxYjFiMTtib3JkZXItd2lkdGg6MCAwIDAgNXB4fS5zdW4tZWRpdG9yLWVkaXRhYmxlIGJsb2NrcXVvdGUgYmxvY2txdW90ZXtib3JkZXItY29sb3I6I2MxYzFjMX0uc3VuLWVkaXRvci1lZGl0YWJsZSBibG9ja3F1b3RlIGJsb2NrcXVvdGUgYmxvY2txdW90ZXtib3JkZXItY29sb3I6I2QxZDFkMX0uc3VuLWVkaXRvci1lZGl0YWJsZSBibG9ja3F1b3RlIGJsb2NrcXVvdGUgYmxvY2txdW90ZSBibG9ja3F1b3Rle2JvcmRlci1jb2xvcjojZTFlMWUxfS5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXJ0bCBibG9ja3F1b3Rle3BhZGRpbmctbGVmdDo1cHg7cGFkZGluZy1yaWdodDoyMHB4O2JvcmRlci1sZWZ0LXdpZHRoOjA7Ym9yZGVyLXJpZ2h0LXdpZHRoOjVweH0uc3VuLWVkaXRvci1lZGl0YWJsZSBoMXtmb250LXNpemU6MmVtO21hcmdpbi1ibG9jay1zdGFydDouNjdlbTttYXJnaW4tYmxvY2stZW5kOi42N2VtfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGgxLC5zdW4tZWRpdG9yLWVkaXRhYmxlIGgye2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWlubGluZS1zdGFydDowO21hcmdpbi1pbmxpbmUtZW5kOjA7Zm9udC13ZWlnaHQ6NzAwfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGgye2ZvbnQtc2l6ZToxLjVlbTttYXJnaW4tYmxvY2stc3RhcnQ6LjgzZW07bWFyZ2luLWJsb2NrLWVuZDouODNlbX0uc3VuLWVkaXRvci1lZGl0YWJsZSBoM3tmb250LXNpemU6MS4xN2VtO21hcmdpbi1ibG9jay1zdGFydDoxZW07bWFyZ2luLWJsb2NrLWVuZDoxZW19LnN1bi1lZGl0b3ItZWRpdGFibGUgaDMsLnN1bi1lZGl0b3ItZWRpdGFibGUgaDR7ZGlzcGxheTpibG9jazttYXJnaW4taW5saW5lLXN0YXJ0OjA7bWFyZ2luLWlubGluZS1lbmQ6MDtmb250LXdlaWdodDo3MDB9LnN1bi1lZGl0b3ItZWRpdGFibGUgaDR7Zm9udC1zaXplOjFlbTttYXJnaW4tYmxvY2stc3RhcnQ6MS4zM2VtO21hcmdpbi1ibG9jay1lbmQ6MS4zM2VtfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGg1e2ZvbnQtc2l6ZTouODNlbTttYXJnaW4tYmxvY2stc3RhcnQ6MS42N2VtO21hcmdpbi1ibG9jay1lbmQ6MS42N2VtfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGg1LC5zdW4tZWRpdG9yLWVkaXRhYmxlIGg2e2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWlubGluZS1zdGFydDowO21hcmdpbi1pbmxpbmUtZW5kOjA7Zm9udC13ZWlnaHQ6NzAwfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGg2e2ZvbnQtc2l6ZTouNjdlbTttYXJnaW4tYmxvY2stc3RhcnQ6Mi4zM2VtO21hcmdpbi1ibG9jay1lbmQ6Mi4zM2VtfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGhye2Rpc3BsYXk6ZmxleDtib3JkZXItd2lkdGg6MXB4IDAgMDtib3JkZXItY29sb3I6IzAwMDtib3JkZXItaW1hZ2U6aW5pdGlhbDtoZWlnaHQ6MXB4fS5zdW4tZWRpdG9yLWVkaXRhYmxlIGhyLl9fc2VfX3NvbGlke2JvcmRlci1zdHlsZTpzb2xpZCBub25lIG5vbmV9LnN1bi1lZGl0b3ItZWRpdGFibGUgaHIuX19zZV9fZG90dGVke2JvcmRlci1zdHlsZTpkb3R0ZWQgbm9uZSBub25lfS5zdW4tZWRpdG9yLWVkaXRhYmxlIGhyLl9fc2VfX2Rhc2hlZHtib3JkZXItc3R5bGU6ZGFzaGVkIG5vbmUgbm9uZX0uc3VuLWVkaXRvci1lZGl0YWJsZSBoci5vbntib3JkZXItY29sb3I6IzQ1OTJmZjstd2Via2l0LWJveC1zaGFkb3c6MCAwIDAgLjFyZW0gI2M3ZGVmZjtib3gtc2hhZG93OjAgMCAwIC4xcmVtICNjN2RlZmZ9LnN1bi1lZGl0b3ItZWRpdGFibGUgdGFibGV7ZGlzcGxheTp0YWJsZTt0YWJsZS1sYXlvdXQ6YXV0byFpbXBvcnRhbnQ7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO3dpZHRoOjEwMCU7bWF4LXdpZHRoOjEwMCU7bWFyZ2luOjAgMCAxMHB4O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXNwYWNpbmc6MDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9LnN1bi1lZGl0b3ItZWRpdGFibGUuc2UtcnRsIHRhYmxle21hcmdpbjowIDAgMTBweCBhdXRvfS5zdW4tZWRpdG9yLWVkaXRhYmxlIHRhYmxlIHRoZWFke2JvcmRlci1ib3R0b206MnB4IHNvbGlkICMzMzN9LnN1bi1lZGl0b3ItZWRpdGFibGUgdGFibGUgdHJ7Ym9yZGVyOjFweCBzb2xpZCAjZWZlZmVmfS5zdW4tZWRpdG9yLWVkaXRhYmxlIHRhYmxlIHRoe2JhY2tncm91bmQtY29sb3I6I2YzZjNmM30uc3VuLWVkaXRvci1lZGl0YWJsZSB0YWJsZSB0ZCwuc3VuLWVkaXRvci1lZGl0YWJsZSB0YWJsZSB0aHtib3JkZXI6MXB4IHNvbGlkICNlMWUxZTE7cGFkZGluZzouNGVtO2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveH0uc3VuLWVkaXRvci1lZGl0YWJsZSB0YWJsZS5zZS10YWJsZS1zaXplLWF1dG97d2lkdGg6YXV0byFpbXBvcnRhbnR9LnN1bi1lZGl0b3ItZWRpdGFibGUgdGFibGUuc2UtdGFibGUtc2l6ZS0xMDB7d2lkdGg6MTAwJSFpbXBvcnRhbnR9LnN1bi1lZGl0b3ItZWRpdGFibGUgdGFibGUuc2UtdGFibGUtbGF5b3V0LWF1dG97dGFibGUtbGF5b3V0OmF1dG8haW1wb3J0YW50fS5zdW4tZWRpdG9yLWVkaXRhYmxlIHRhYmxlLnNlLXRhYmxlLWxheW91dC1maXhlZHt0YWJsZS1sYXlvdXQ6Zml4ZWQhaW1wb3J0YW50fS5zdW4tZWRpdG9yLWVkaXRhYmxlIHRhYmxlIHRkLnNlLXRhYmxlLXNlbGVjdGVkLWNlbGwsLnN1bi1lZGl0b3ItZWRpdGFibGUgdGFibGUgdGguc2UtdGFibGUtc2VsZWN0ZWQtY2VsbHtvdXRsaW5lOjFweCBkb3VibGUgIzQ1OTJmZn0uc3VuLWVkaXRvci1lZGl0YWJsZS5zZS1kaXNhYmxlZCAqe3VzZXItc2VsZWN0Om5vbmU7LW8tdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LWtodG1sLXVzZXItc2VsZWN0Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lfS5zdW4tZWRpdG9yLWVkaXRhYmxlIC5zZS1jb21wb25lbnR7ZGlzcGxheTpmbGV4O3BhZGRpbmc6MXB4O21hcmdpbjowIDAgMTBweH0uc3VuLWVkaXRvci1lZGl0YWJsZVtjb250ZW50ZWRpdGFibGU9dHJ1ZV0gLnNlLWNvbXBvbmVudHtvdXRsaW5lOjFweCBkYXNoZWQgI2UxZTFlMX0uc3VuLWVkaXRvci1lZGl0YWJsZVtjb250ZW50ZWRpdGFibGU9dHJ1ZV0gLnNlLWNvbXBvbmVudC5zZS1jb21wb25lbnQtY29weXstd2Via2l0LWJveC1zaGFkb3c6MCAwIDAgLjJyZW0gIzgwYmRmZjtib3gtc2hhZG93OjAgMCAwIC4ycmVtICMzZjlkZmY7dHJhbnNpdGlvbjpib3JkZXItY29sb3IgLjE1cyBlYXNlLWluLW91dCxib3gtc2hhZG93IC4xNXMgZWFzZS1pbi1vdXR9LnN1bi1lZGl0b3ItZWRpdGFibGUgLl9fc2VfX2Zsb2F0LWxlZnR7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6NHB4fS5zdW4tZWRpdG9yLWVkaXRhYmxlIC5fX3NlX19mbG9hdC1yaWdodHtmbG9hdDpyaWdodDttYXJnaW4tbGVmdDo0cHh9LnN1bi1lZGl0b3ItZWRpdGFibGUgLl9fc2VfX2Zsb2F0LWNlbnRlcntmbG9hdDpjZW50ZXJ9LnN1bi1lZGl0b3ItZWRpdGFibGUgLl9fc2VfX2Zsb2F0LW5vbmV7ZmxvYXQ6bm9uZX0uc3VuLWVkaXRvci1lZGl0YWJsZSBhdWRpbywuc3VuLWVkaXRvci1lZGl0YWJsZSBpZnJhbWUsLnN1bi1lZGl0b3ItZWRpdGFibGUgaW1nLC5zdW4tZWRpdG9yLWVkaXRhYmxlIHZpZGVve2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87bWF4LXdpZHRoOjEwMCV9LnN1bi1lZGl0b3ItZWRpdGFibGVbY29udGVudGVkaXRhYmxlPXRydWVdOm5vdCguc2UtcmVhZC1vbmx5KSBmaWd1cmU6YWZ0ZXJ7cG9zaXRpb246YWJzb2x1dGU7Y29udGVudDpcIlwiO3otaW5kZXg6MTt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDtjdXJzb3I6ZGVmYXVsdDtkaXNwbGF5OmJsb2NrO2JhY2tncm91bmQ6dHJhbnNwYXJlbnR9LnN1bi1lZGl0b3ItZWRpdGFibGVbY29udGVudGVkaXRhYmxlPXRydWVdIGZpZ3VyZSBhLC5zdW4tZWRpdG9yLWVkaXRhYmxlW2NvbnRlbnRlZGl0YWJsZT10cnVlXSBmaWd1cmUgaWZyYW1lLC5zdW4tZWRpdG9yLWVkaXRhYmxlW2NvbnRlbnRlZGl0YWJsZT10cnVlXSBmaWd1cmUgaW1nLC5zdW4tZWRpdG9yLWVkaXRhYmxlW2NvbnRlbnRlZGl0YWJsZT10cnVlXSBmaWd1cmUgdmlkZW97ei1pbmRleDowfS5zdW4tZWRpdG9yLWVkaXRhYmxlW2NvbnRlbnRlZGl0YWJsZT10cnVlXSBmaWd1cmUgZmlnY2FwdGlvbntkaXNwbGF5OmJsb2NrO3otaW5kZXg6Mn0uc3VuLWVkaXRvci1lZGl0YWJsZVtjb250ZW50ZWRpdGFibGU9dHJ1ZV0gZmlndXJlIGZpZ2NhcHRpb246Zm9jdXN7Ym9yZGVyLWNvbG9yOiM4MGJkZmY7b3V0bGluZTowOy13ZWJraXQtYm94LXNoYWRvdzowIDAgMCAuMnJlbSAjYzdkZWZmO2JveC1zaGFkb3c6MCAwIDAgLjJyZW0gI2M3ZGVmZn0uc3VuLWVkaXRvci1lZGl0YWJsZSAuc2UtaW1hZ2UtY29udGFpbmVyLC5zdW4tZWRpdG9yLWVkaXRhYmxlIC5zZS12aWRlby1jb250YWluZXJ7d2lkdGg6YXV0bztoZWlnaHQ6YXV0bzttYXgtd2lkdGg6MTAwJX0uc3VuLWVkaXRvci1lZGl0YWJsZSBmaWd1cmV7ZGlzcGxheTpibG9jaztvdXRsaW5lOm5vbmU7cGFkZGluZzowO21hcmdpbjowfS5zdW4tZWRpdG9yLWVkaXRhYmxlIC5fX3NlX19mbG9hdC1jZW50ZXIgZmlndXJlLC5zdW4tZWRpdG9yLWVkaXRhYmxlIC5fX3NlX19mbG9hdC1sZWZ0IGZpZ3VyZSwuc3VuLWVkaXRvci1lZGl0YWJsZSAuX19zZV9fZmxvYXQtcmlnaHQgZmlndXJle21hcmdpbjphdXRvIWltcG9ydGFudH0uc3VuLWVkaXRvci1lZGl0YWJsZSBmaWd1cmUgZmlnY2FwdGlvbntwYWRkaW5nOjFlbSAuNWVtO21hcmdpbjowO2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOTtvdXRsaW5lOm5vbmV9LnN1bi1lZGl0b3ItZWRpdGFibGUgZmlndXJlIGZpZ2NhcHRpb24gcHtsaW5lLWhlaWdodDoyO21hcmdpbjowfS5zdW4tZWRpdG9yLWVkaXRhYmxlIC5zZS1pbWFnZS1jb250YWluZXIgYSBpbWd7cGFkZGluZzoxcHg7bWFyZ2luOjFweDtvdXRsaW5lOjFweCBzb2xpZCAjNDU5MmZmfS5zdW4tZWRpdG9yLWVkaXRhYmxlIC5zZS12aWRlby1jb250YWluZXIgaWZyYW1lLC5zdW4tZWRpdG9yLWVkaXRhYmxlIC5zZS12aWRlby1jb250YWluZXIgdmlkZW97b3V0bGluZToxcHggc29saWQgIzllOWU5ZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7Ym9yZGVyOjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0uc3VuLWVkaXRvci1lZGl0YWJsZSAuc2UtdmlkZW8tY29udGFpbmVyIGZpZ3VyZXtsZWZ0OjA7d2lkdGg6MTAwJTttYXgtd2lkdGg6MTAwJX0uc3VuLWVkaXRvci1lZGl0YWJsZSBhdWRpb3t3aWR0aDozMDBweDtoZWlnaHQ6NTRweH0uc3VuLWVkaXRvci1lZGl0YWJsZSBhdWRpby5hY3RpdmV7b3V0bGluZToycHggc29saWQgIzgwYmRmZn0uc3VuLWVkaXRvci1lZGl0YWJsZS5zZS1zaG93LWJsb2NrIGRpdiwuc3VuLWVkaXRvci1lZGl0YWJsZS5zZS1zaG93LWJsb2NrIGgxLC5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXNob3ctYmxvY2sgaDIsLnN1bi1lZGl0b3ItZWRpdGFibGUuc2Utc2hvdy1ibG9jayBoMywuc3VuLWVkaXRvci1lZGl0YWJsZS5zZS1zaG93LWJsb2NrIGg0LC5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXNob3ctYmxvY2sgaDUsLnN1bi1lZGl0b3ItZWRpdGFibGUuc2Utc2hvdy1ibG9jayBoNiwuc3VuLWVkaXRvci1lZGl0YWJsZS5zZS1zaG93LWJsb2NrIGxpLC5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXNob3ctYmxvY2sgb2wsLnN1bi1lZGl0b3ItZWRpdGFibGUuc2Utc2hvdy1ibG9jayBwLC5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXNob3ctYmxvY2sgcHJlLC5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXNob3ctYmxvY2sgdWx7Ym9yZGVyOjFweCBkYXNoZWQgIzNmOWRmZiFpbXBvcnRhbnQ7cGFkZGluZzoxNHB4IDhweCA4cHghaW1wb3J0YW50fS5zdW4tZWRpdG9yLWVkaXRhYmxlLnNlLXNob3ctYmxvY2sgb2wsLnN1bi1lZGl0b3ItZWRpdGFibGUuc2Utc2hvdy1ibG9jayB1bHtib3JkZXI6MXB4IGRhc2hlZCAjZDUzOWZmIWltcG9ydGFudH0uc3VuLWVkaXRvci1lZGl0YWJsZS5zZS1zaG93LWJsb2NrIHByZXtib3JkZXI6MXB4IGRhc2hlZCAjMjdjMDIyIWltcG9ydGFudH0uc2Utc2hvdy1ibG9jayBwe2JhY2tncm91bmQ6dXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBMEFBQUFQQVFNQUFBQUY3ZGMwQUFBQUJsQk1WRVdBZ0lELy8vL24xbzJzQUFBQUFuUlNUbFAvQU9XM01Fb0FBQUFhU1VSQlZBalhZL2ovZ3dHQ1B2eGcrRjRCUWlBR0RQMUhRUUJ5eHh3MGdxT3pJd0FBQUFCSlJVNUVya0pnZ2c9PVwiKSBuby1yZXBlYXR9LnNlLXNob3ctYmxvY2sgZGl2e2JhY2tncm91bmQ6dXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCVUFBQUFQQVFNQUFBQXhsQllvQUFBQUJsQk1WRVdBZ0lELy8vL24xbzJzQUFBQUFuUlNUbFAvQU9XM01Fb0FBQUFtU1VSQlZBalhZL2ovL3djRERIKzhYc0h3RFlpL2h3TngxQTh3L25ZTEtINFhvUVlKQXdDWG5TZ2NsMk1PUGdBQUFBQkpSVTVFcmtKZ2dnPT1cIikgbm8tcmVwZWF0fS5zZS1zaG93LWJsb2NrIGgxe2JhY2tncm91bmQ6dXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCRUFBQUFQQVFNQUFBQTRmN1pTQUFBQUJsQk1WRVdBZ0lELy8vL24xbzJzQUFBQUFuUlNUbFAvQU9XM01Fb0FBQUFmU1VSQlZBalhZL2ovdjRFQmhyKzlCK0x6RVByRGV5Z2ZoSThqMUNCaEFFaG1KR1k0UmY2dUFBQUFBRWxGVGtTdVFtQ0NcIikgbm8tcmVwZWF0fS5zZS1zaG93LWJsb2NrIGgye2JhY2tncm91bmQ6dXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCRUFBQUFQQVFNQUFBQTRmN1pTQUFBQUJsQk1WRVdBZ0lELy8vL24xbzJzQUFBQUFuUlNUbFAvQU9XM01Fb0FBQUFtU1VSQlZBalhZL2ovdjRFQmhyK2RCK0x0UVB5OWdlRURFSDk3RDhUM2diZ2RvUVlKQXdBNTFpUHVEMmhhRUFBQUFBQkpSVTVFcmtKZ2dnPT1cIikgbm8tcmVwZWF0fS5zZS1zaG93LWJsb2NrIGgze2JhY2tncm91bmQ6dXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCRUFBQUFQQVFNQUFBQTRmN1pTQUFBQUJsQk1WRVdBZ0lELy8vL24xbzJzQUFBQUFuUlNUbFAvQU9XM01Fb0FBQUFpU1VSQlZBalhZL2ovdjRFQmhyK2RCK0x0UVB5OWdlSERlUWdONXA5SHFFSENBRGVXSSs2OVZHMk1BQUFBQUVsRlRrU3VRbUNDXCIpIG5vLXJlcGVhdH0uc2Utc2hvdy1ibG9jayBoNHtiYWNrZ3JvdW5kOnVybChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQklBQUFBUEFRTUFBQURUU0ExUkFBQUFCbEJNVkVXQWdJRC8vLy9uMW8yc0FBQUFBblJTVGxQL0FPVzNNRW9BQUFBaVNVUkJWQWpYWS9qLy93QURESDk3RHNUWElmakRkaURkRE1UZklSaFpIUlFEQUtKT0o2TCtLM3k3QUFBQUFFbEZUa1N1UW1DQ1wiKSBuby1yZXBlYXR9LnNlLXNob3ctYmxvY2sgaDV7YmFja2dyb3VuZDp1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJFQUFBQVBBUU1BQUFBNGY3WlNBQUFBQmxCTVZFV0FnSUQvLy8vbjFvMnNBQUFBQW5SU1RsUC9BT1czTUVvQUFBQWxTVVJCVkFqWFkvai92NEVCaHIrMUEvRitJTzV2WVBpd0hVaC9CMklRZlI2aEJna0RBQmxXSXk1dU0rOUdBQUFBQUVsRlRrU3VRbUNDXCIpIG5vLXJlcGVhdH0uc2Utc2hvdy1ibG9jayBoNntiYWNrZ3JvdW5kOnVybChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQkVBQUFBUEFRTUFBQUE0ZjdaU0FBQUFCbEJNVkVXQWdJRC8vLy9uMW8yc0FBQUFBblJTVGxQL0FPVzNNRW9BQUFBaVNVUkJWQWpYWS9qL3Y0RUJocitkQitMdFFMeS9nZUZEUDVTOUhTS09yQTZLQVI5R0l6YTFwdEpuQUFBQUFFbEZUa1N1UW1DQ1wiKSBuby1yZXBlYXR9LnNlLXNob3ctYmxvY2sgbGl7YmFja2dyb3VuZDp1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJRQUFBQVBDQVlBQUFEa21POVZBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFBSmNFaFpjd0FBRHNNQUFBN0RBY2R2cUdRQUFBQTdTVVJCVkRoUFl4Z0ZjTkRRMFBBZnlrUUJJSEVZaGdvUkIvQnB3Q2ZIQktXcEJrYWdnWXhRR2dPZ0J6eVFEMWFMTEE0VEd3V0RHakF3QUFDUjNSY0VVOVVpK3dBQUFBQkpSVTVFcmtKZ2dnPT1cIikgbm8tcmVwZWF0fS5zZS1zaG93LWJsb2NrIG9se2JhY2tncm91bmQ6dXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCUUFBQUFNQ0FZQUFBQmlESjM3QUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUJIU1VSQlZEaFBZeGdGY05EUTBQQWZoS0ZjRklCTEhDZEExb0JOTTBrR0VtTUFQZ09ab0RUVkFOVU54QXFRdlVSTUVDQURSaWlOQVdDYWdEU0dHaHlXNERSck1BRUdCZ0F1MFNYNldwR2dqQUFBQUFCSlJVNUVya0pnZ2c9PVwiKSBuby1yZXBlYXR9LnNlLXNob3ctYmxvY2sgdWx7YmFja2dyb3VuZDp1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJRQUFBQU1DQVlBQUFCaURKMzdBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFBSmNFaFpjd0FBRHNNQUFBN0RBY2R2cUdRQUFBQTFTVVJCVkRoUFl4Z0ZEQTBORGYraFRCU0FMSTVMRFFnd1FXbXFnVkVES1Fjc1VCb0Y0SXRGR0VCWEErUXpRcG1ER2pBd0FBQThEUTRMbmk2Z2RBQUFBQUJKUlU1RXJrSmdnZz09XCIpIG5vLXJlcGVhdH0uc3VuLWVkaXRvci1lZGl0YWJsZSAuX19zZV9fcC1ib3JkZXJlZCwuc3VuLWVkaXRvciAuX19zZV9fcC1ib3JkZXJlZHtib3JkZXItdG9wOjFweCBzb2xpZCAjYjFiMWIxO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNiMWIxYjE7cGFkZGluZzo0cHggMH0uc3VuLWVkaXRvci1lZGl0YWJsZSAuX19zZV9fcC1zcGFjZWQsLnN1bi1lZGl0b3IgLl9fc2VfX3Atc3BhY2Vke2xldHRlci1zcGFjaW5nOjFweH0uc3VuLWVkaXRvci1lZGl0YWJsZSAuX19zZV9fcC1uZW9uLC5zdW4tZWRpdG9yIC5fX3NlX19wLW5lb257Zm9udC13ZWlnaHQ6MjAwO2ZvbnQtc3R5bGU6aXRhbGljO2JhY2tncm91bmQ6IzAwMDtjb2xvcjojZmZmO3BhZGRpbmc6NnB4IDRweDtib3JkZXI6MnB4IHNvbGlkICNmZmY7Ym9yZGVyLXJhZGl1czo2cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2FuaW1hdGlvbjpuZW9uRmxpY2tlciAxLjVzIGluZmluaXRlIGFsdGVybmF0ZX1Aa2V5ZnJhbWVzIG5lb25GbGlja2VyezAlLDE5JSwyMSUsMjMlLDI1JSw1NCUsNTYlLHRve3RleHQtc2hhZG93Oi0uMnJlbSAtLjJyZW0gMXJlbSAjZmZmLC4ycmVtIC4ycmVtIDFyZW0gI2ZmZiwwIDAgMnB4ICNmNDAsMCAwIDRweCAjZjQwLDAgMCA2cHggI2Y0MCwwIDAgOHB4ICNmNDAsMCAwIDEwcHggI2Y0MDtib3gtc2hhZG93OjAgMCAuNXB4ICNmZmYsaW5zZXQgMCAwIC41cHggI2ZmZiwwIDAgMnB4ICMwOGYsaW5zZXQgMCAwIDJweCAjMDhmLDAgMCA0cHggIzA4ZixpbnNldCAwIDAgNHB4ICMwOGZ9MjAlLDI0JSw1NSV7dGV4dC1zaGFkb3c6bm9uZTtib3gtc2hhZG93Om5vbmV9fS5zdW4tZWRpdG9yLWVkaXRhYmxlIC5fX3NlX190LXNoYWRvdywuc3VuLWVkaXRvciAuX19zZV9fdC1zaGFkb3d7dGV4dC1zaGFkb3c6LS4ycmVtIC0uMnJlbSAxcmVtICNmZmYsLjJyZW0gLjJyZW0gMXJlbSAjZmZmLDAgMCAuMnJlbSAjOTk5LDAgMCAuNHJlbSAjODg4LDAgMCAuNnJlbSAjNzc3LDAgMCAuOHJlbSAjNjY2LDAgMCAxcmVtICM1NTV9LnN1bi1lZGl0b3ItZWRpdGFibGUgLl9fc2VfX3QtY29kZSwuc3VuLWVkaXRvciAuX19zZV9fdC1jb2Rle2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtjb2xvcjojNjY2O2JhY2tncm91bmQtY29sb3I6cmdiYSgyNywzMSwzNSwuMDUpO2JvcmRlci1yYWRpdXM6NnB4O3BhZGRpbmc6LjJlbSAuNGVtfSJdLCJzb3VyY2VSb290IjoiIn0= */
</style>
<style>
    @font-face {
        font-family: KaTeX_AMS;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_AMS-Regular.73ea273a72f4aca30ca5.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_AMS-Regular.d562e886c52f12660a41.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_AMS-Regular.853be92419a6c3766b9a.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Caligraphic;
        font-style: normal;
        font-weight: 700;
        src: url(http://localhost:3002/static/media/KaTeX_Caligraphic-Bold.a1abf90dfd72792a577a.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Caligraphic-Bold.d757c535a2e5902f1325.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Caligraphic-Bold.7489a2fbfb9bfe704420.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Caligraphic;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Caligraphic-Regular.d6484fce1ef428d5bd94.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Caligraphic-Regular.db074fa22cf224af93d7.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Caligraphic-Regular.7e873d3833eb108a0758.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Fraktur;
        font-style: normal;
        font-weight: 700;
        src: url(http://localhost:3002/static/media/KaTeX_Fraktur-Bold.931d67ea207ab37ee693.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Fraktur-Bold.354501bac435c3264834.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Fraktur-Bold.4c761b3711973ab04edf.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Fraktur;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Fraktur-Regular.172d3529b26f8cedef6b.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Fraktur-Regular.6fdf0ac577be0ba82a4c.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Fraktur-Regular.ed305b5434865e06ffde.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Main;
        font-style: normal;
        font-weight: 700;
        src: url(http://localhost:3002/static/media/KaTeX_Main-Bold.39890742bc957b368704.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Main-Bold.0c3b8929d377c0e9b2f3.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Main-Bold.8169508bf58f8bd92ad8.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Main;
        font-style: italic;
        font-weight: 700;
        src: url(http://localhost:3002/static/media/KaTeX_Main-BoldItalic.20f389c4120be058d80a.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Main-BoldItalic.428978dc7837d46de091.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Main-BoldItalic.828abcb200061cffbaae.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Main;
        font-style: italic;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Main-Italic.fe2176f79edaa716e621.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Main-Italic.fd947498bc16392e76c2.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Main-Italic.fa675e5e4bec9eb250b6.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Main;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Main-Regular.f650f111a3b890d116f1.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Main-Regular.4f35fbcc9ee8614c2bcc.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Main-Regular.9eba1d77abcf2aa6e94e.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Math;
        font-style: italic;
        font-weight: 700;
        src: url(http://localhost:3002/static/media/KaTeX_Math-BoldItalic.dcbcbd93bac0470b462d.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Math-BoldItalic.3f07ed67f06c720120ce.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Math-BoldItalic.bf2d440b3a42ea78a998.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Math;
        font-style: italic;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Math-Italic.6d3d25f4820d0da8f01f.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Math-Italic.96759856b4e70f3a8338.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Math-Italic.8a5f936332e8028c7278.ttf) format("truetype")
    }

    @font-face {
        font-family: "KaTeX_SansSerif";
        font-style: normal;
        font-weight: 700;
        src: url(http://localhost:3002/static/media/KaTeX_SansSerif-Bold.95591a929f0d32aa282a.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_SansSerif-Bold.b9cd458ac6d5889ff9c3.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_SansSerif-Bold.5b49f4993ae22d7975b4.ttf) format("truetype")
    }

    @font-face {
        font-family: "KaTeX_SansSerif";
        font-style: italic;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_SansSerif-Italic.7d393d382f3e7fb1c637.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_SansSerif-Italic.8d593cfaa96238d5e2f8.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_SansSerif-Italic.b257a18c016f37ee4543.ttf) format("truetype")
    }

    @font-face {
        font-family: "KaTeX_SansSerif";
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_SansSerif-Regular.cd5e231e0cc53b2cb2c0.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_SansSerif-Regular.02271ec5cb9f5b4588ac.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_SansSerif-Regular.2f7bc363fc5424ebda59.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Script;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Script-Regular.c81d1b2a4b75d3eded60.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Script-Regular.073b3402d036714b4370.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Script-Regular.fc9ba5249878cd8f8d88.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Size1;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Size1-Regular.6eec866c69313624be60.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Size1-Regular.0108e89c9003e8c14ea3.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Size1-Regular.6de7d4b539221a49e9e2.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Size2;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Size2-Regular.2960900c4f271311eb36.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Size2-Regular.3a99e70aee4076660d38.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Size2-Regular.57f5c1837853986ea1db.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Size3;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Size3-Regular.e1951519f6f0596f7356.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Size3-Regular.7947224e8a9914fa332b.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Size3-Regular.8d6b6822586eea3d3b20.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Size4;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Size4-Regular.e418bf257af1052628d8.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Size4-Regular.aeffd8025cba3647f1a6.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Size4-Regular.4ad7c7e8bb8d10a34bb7.ttf) format("truetype")
    }

    @font-face {
        font-family: KaTeX_Typewriter;
        font-style: normal;
        font-weight: 400;
        src: url(http://localhost:3002/static/media/KaTeX_Typewriter-Regular.c295e7f71970f03c0549.woff2) format("woff2"), url(http://localhost:3002/static/media/KaTeX_Typewriter-Regular.4c6b94fd1d07f8beff7c.woff) format("woff"), url(http://localhost:3002/static/media/KaTeX_Typewriter-Regular.c5c02d763c89380dcb4e.ttf) format("truetype")
    }

    .katex {
        text-rendering: auto;
        font: normal 1.21em KaTeX_Main, Times New Roman, serif;
        line-height: 1.2;
        text-indent: 0
    }

    .katex * {
        -ms-high-contrast-adjust: none !important;
        border-color: currentColor
    }

    .katex .katex-version:after {
        content: "0.16.9"
    }

    .katex .katex-mathml {
        clip: rect(1px, 1px, 1px, 1px);
        border: 0;
        height: 1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px
    }

    .katex .katex-html>.newline {
        display: block
    }

    .katex .base {
        position: relative;
        white-space: nowrap;
        width: min-content
    }

    .katex .base,
    .katex .strut {
        display: inline-block
    }

    .katex .textbf {
        font-weight: 700
    }

    .katex .textit {
        font-style: italic
    }

    .katex .textrm {
        font-family: KaTeX_Main
    }

    .katex .textsf {
        font-family: KaTeX_SansSerif
    }

    .katex .texttt {
        font-family: KaTeX_Typewriter
    }

    .katex .mathnormal {
        font-family: KaTeX_Math;
        font-style: italic
    }

    .katex .mathit {
        font-family: KaTeX_Main;
        font-style: italic
    }

    .katex .mathrm {
        font-style: normal
    }

    .katex .mathbf {
        font-family: KaTeX_Main;
        font-weight: 700
    }

    .katex .boldsymbol {
        font-family: KaTeX_Math;
        font-style: italic;
        font-weight: 700
    }

    .katex .amsrm,
    .katex .mathbb,
    .katex .textbb {
        font-family: KaTeX_AMS
    }

    .katex .mathcal {
        font-family: KaTeX_Caligraphic
    }

    .katex .mathfrak,
    .katex .textfrak {
        font-family: KaTeX_Fraktur
    }

    .katex .mathboldfrak,
    .katex .textboldfrak {
        font-family: KaTeX_Fraktur;
        font-weight: 700
    }

    .katex .mathtt {
        font-family: KaTeX_Typewriter
    }

    .katex .mathscr,
    .katex .textscr {
        font-family: KaTeX_Script
    }

    .katex .mathsf,
    .katex .textsf {
        font-family: KaTeX_SansSerif
    }

    .katex .mathboldsf,
    .katex .textboldsf {
        font-family: KaTeX_SansSerif;
        font-weight: 700
    }

    .katex .mathitsf,
    .katex .textitsf {
        font-family: KaTeX_SansSerif;
        font-style: italic
    }

    .katex .mainrm {
        font-family: KaTeX_Main;
        font-style: normal
    }

    .katex .vlist-t {
        border-collapse: collapse;
        display: inline-table;
        table-layout: fixed
    }

    .katex .vlist-r {
        display: table-row
    }

    .katex .vlist {
        display: table-cell;
        position: relative;
        vertical-align: bottom
    }

    .katex .vlist>span {
        display: block;
        height: 0;
        position: relative
    }

    .katex .vlist>span>span {
        display: inline-block
    }

    .katex .vlist>span>.pstrut {
        overflow: hidden;
        width: 0
    }

    .katex .vlist-t2 {
        margin-right: -2px
    }

    .katex .vlist-s {
        display: table-cell;
        font-size: 1px;
        min-width: 2px;
        vertical-align: bottom;
        width: 2px
    }

    .katex .vbox {
        align-items: baseline;
        display: inline-flex;
        flex-direction: column
    }

    .katex .hbox {
        width: 100%
    }

    .katex .hbox,
    .katex .thinbox {
        display: inline-flex;
        flex-direction: row
    }

    .katex .thinbox {
        max-width: 0;
        width: 0
    }

    .katex .msupsub {
        text-align: left
    }

    .katex .mfrac>span>span {
        text-align: center
    }

    .katex .mfrac .frac-line {
        border-bottom-style: solid;
        display: inline-block;
        width: 100%
    }

    .katex .hdashline,
    .katex .hline,
    .katex .mfrac .frac-line,
    .katex .overline .overline-line,
    .katex .rule,
    .katex .underline .underline-line {
        min-height: 1px
    }

    .katex .mspace {
        display: inline-block
    }

    .katex .clap,
    .katex .llap,
    .katex .rlap {
        position: relative;
        width: 0
    }

    .katex .clap>.inner,
    .katex .llap>.inner,
    .katex .rlap>.inner {
        position: absolute
    }

    .katex .clap>.fix,
    .katex .llap>.fix,
    .katex .rlap>.fix {
        display: inline-block
    }

    .katex .llap>.inner {
        right: 0
    }

    .katex .clap>.inner,
    .katex .rlap>.inner {
        left: 0
    }

    .katex .clap>.inner>span {
        margin-left: -50%;
        margin-right: 50%
    }

    .katex .rule {
        border: 0 solid;
        display: inline-block;
        position: relative
    }

    .katex .hline,
    .katex .overline .overline-line,
    .katex .underline .underline-line {
        border-bottom-style: solid;
        display: inline-block;
        width: 100%
    }

    .katex .hdashline {
        border-bottom-style: dashed;
        display: inline-block;
        width: 100%
    }

    .katex .sqrt>.root {
        margin-left: .27777778em;
        margin-right: -.55555556em
    }

    .katex .fontsize-ensurer.reset-size1.size1,
    .katex .sizing.reset-size1.size1 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size1.size2,
    .katex .sizing.reset-size1.size2 {
        font-size: 1.2em
    }

    .katex .fontsize-ensurer.reset-size1.size3,
    .katex .sizing.reset-size1.size3 {
        font-size: 1.4em
    }

    .katex .fontsize-ensurer.reset-size1.size4,
    .katex .sizing.reset-size1.size4 {
        font-size: 1.6em
    }

    .katex .fontsize-ensurer.reset-size1.size5,
    .katex .sizing.reset-size1.size5 {
        font-size: 1.8em
    }

    .katex .fontsize-ensurer.reset-size1.size6,
    .katex .sizing.reset-size1.size6 {
        font-size: 2em
    }

    .katex .fontsize-ensurer.reset-size1.size7,
    .katex .sizing.reset-size1.size7 {
        font-size: 2.4em
    }

    .katex .fontsize-ensurer.reset-size1.size8,
    .katex .sizing.reset-size1.size8 {
        font-size: 2.88em
    }

    .katex .fontsize-ensurer.reset-size1.size9,
    .katex .sizing.reset-size1.size9 {
        font-size: 3.456em
    }

    .katex .fontsize-ensurer.reset-size1.size10,
    .katex .sizing.reset-size1.size10 {
        font-size: 4.148em
    }

    .katex .fontsize-ensurer.reset-size1.size11,
    .katex .sizing.reset-size1.size11 {
        font-size: 4.976em
    }

    .katex .fontsize-ensurer.reset-size2.size1,
    .katex .sizing.reset-size2.size1 {
        font-size: .83333333em
    }

    .katex .fontsize-ensurer.reset-size2.size2,
    .katex .sizing.reset-size2.size2 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size2.size3,
    .katex .sizing.reset-size2.size3 {
        font-size: 1.16666667em
    }

    .katex .fontsize-ensurer.reset-size2.size4,
    .katex .sizing.reset-size2.size4 {
        font-size: 1.33333333em
    }

    .katex .fontsize-ensurer.reset-size2.size5,
    .katex .sizing.reset-size2.size5 {
        font-size: 1.5em
    }

    .katex .fontsize-ensurer.reset-size2.size6,
    .katex .sizing.reset-size2.size6 {
        font-size: 1.66666667em
    }

    .katex .fontsize-ensurer.reset-size2.size7,
    .katex .sizing.reset-size2.size7 {
        font-size: 2em
    }

    .katex .fontsize-ensurer.reset-size2.size8,
    .katex .sizing.reset-size2.size8 {
        font-size: 2.4em
    }

    .katex .fontsize-ensurer.reset-size2.size9,
    .katex .sizing.reset-size2.size9 {
        font-size: 2.88em
    }

    .katex .fontsize-ensurer.reset-size2.size10,
    .katex .sizing.reset-size2.size10 {
        font-size: 3.45666667em
    }

    .katex .fontsize-ensurer.reset-size2.size11,
    .katex .sizing.reset-size2.size11 {
        font-size: 4.14666667em
    }

    .katex .fontsize-ensurer.reset-size3.size1,
    .katex .sizing.reset-size3.size1 {
        font-size: .71428571em
    }

    .katex .fontsize-ensurer.reset-size3.size2,
    .katex .sizing.reset-size3.size2 {
        font-size: .85714286em
    }

    .katex .fontsize-ensurer.reset-size3.size3,
    .katex .sizing.reset-size3.size3 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size3.size4,
    .katex .sizing.reset-size3.size4 {
        font-size: 1.14285714em
    }

    .katex .fontsize-ensurer.reset-size3.size5,
    .katex .sizing.reset-size3.size5 {
        font-size: 1.28571429em
    }

    .katex .fontsize-ensurer.reset-size3.size6,
    .katex .sizing.reset-size3.size6 {
        font-size: 1.42857143em
    }

    .katex .fontsize-ensurer.reset-size3.size7,
    .katex .sizing.reset-size3.size7 {
        font-size: 1.71428571em
    }

    .katex .fontsize-ensurer.reset-size3.size8,
    .katex .sizing.reset-size3.size8 {
        font-size: 2.05714286em
    }

    .katex .fontsize-ensurer.reset-size3.size9,
    .katex .sizing.reset-size3.size9 {
        font-size: 2.46857143em
    }

    .katex .fontsize-ensurer.reset-size3.size10,
    .katex .sizing.reset-size3.size10 {
        font-size: 2.96285714em
    }

    .katex .fontsize-ensurer.reset-size3.size11,
    .katex .sizing.reset-size3.size11 {
        font-size: 3.55428571em
    }

    .katex .fontsize-ensurer.reset-size4.size1,
    .katex .sizing.reset-size4.size1 {
        font-size: .625em
    }

    .katex .fontsize-ensurer.reset-size4.size2,
    .katex .sizing.reset-size4.size2 {
        font-size: .75em
    }

    .katex .fontsize-ensurer.reset-size4.size3,
    .katex .sizing.reset-size4.size3 {
        font-size: .875em
    }

    .katex .fontsize-ensurer.reset-size4.size4,
    .katex .sizing.reset-size4.size4 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size4.size5,
    .katex .sizing.reset-size4.size5 {
        font-size: 1.125em
    }

    .katex .fontsize-ensurer.reset-size4.size6,
    .katex .sizing.reset-size4.size6 {
        font-size: 1.25em
    }

    .katex .fontsize-ensurer.reset-size4.size7,
    .katex .sizing.reset-size4.size7 {
        font-size: 1.5em
    }

    .katex .fontsize-ensurer.reset-size4.size8,
    .katex .sizing.reset-size4.size8 {
        font-size: 1.8em
    }

    .katex .fontsize-ensurer.reset-size4.size9,
    .katex .sizing.reset-size4.size9 {
        font-size: 2.16em
    }

    .katex .fontsize-ensurer.reset-size4.size10,
    .katex .sizing.reset-size4.size10 {
        font-size: 2.5925em
    }

    .katex .fontsize-ensurer.reset-size4.size11,
    .katex .sizing.reset-size4.size11 {
        font-size: 3.11em
    }

    .katex .fontsize-ensurer.reset-size5.size1,
    .katex .sizing.reset-size5.size1 {
        font-size: .55555556em
    }

    .katex .fontsize-ensurer.reset-size5.size2,
    .katex .sizing.reset-size5.size2 {
        font-size: .66666667em
    }

    .katex .fontsize-ensurer.reset-size5.size3,
    .katex .sizing.reset-size5.size3 {
        font-size: .77777778em
    }

    .katex .fontsize-ensurer.reset-size5.size4,
    .katex .sizing.reset-size5.size4 {
        font-size: .88888889em
    }

    .katex .fontsize-ensurer.reset-size5.size5,
    .katex .sizing.reset-size5.size5 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size5.size6,
    .katex .sizing.reset-size5.size6 {
        font-size: 1.11111111em
    }

    .katex .fontsize-ensurer.reset-size5.size7,
    .katex .sizing.reset-size5.size7 {
        font-size: 1.33333333em
    }

    .katex .fontsize-ensurer.reset-size5.size8,
    .katex .sizing.reset-size5.size8 {
        font-size: 1.6em
    }

    .katex .fontsize-ensurer.reset-size5.size9,
    .katex .sizing.reset-size5.size9 {
        font-size: 1.92em
    }

    .katex .fontsize-ensurer.reset-size5.size10,
    .katex .sizing.reset-size5.size10 {
        font-size: 2.30444444em
    }

    .katex .fontsize-ensurer.reset-size5.size11,
    .katex .sizing.reset-size5.size11 {
        font-size: 2.76444444em
    }

    .katex .fontsize-ensurer.reset-size6.size1,
    .katex .sizing.reset-size6.size1 {
        font-size: .5em
    }

    .katex .fontsize-ensurer.reset-size6.size2,
    .katex .sizing.reset-size6.size2 {
        font-size: .6em
    }

    .katex .fontsize-ensurer.reset-size6.size3,
    .katex .sizing.reset-size6.size3 {
        font-size: .7em
    }

    .katex .fontsize-ensurer.reset-size6.size4,
    .katex .sizing.reset-size6.size4 {
        font-size: .8em
    }

    .katex .fontsize-ensurer.reset-size6.size5,
    .katex .sizing.reset-size6.size5 {
        font-size: .9em
    }

    .katex .fontsize-ensurer.reset-size6.size6,
    .katex .sizing.reset-size6.size6 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size6.size7,
    .katex .sizing.reset-size6.size7 {
        font-size: 1.2em
    }

    .katex .fontsize-ensurer.reset-size6.size8,
    .katex .sizing.reset-size6.size8 {
        font-size: 1.44em
    }

    .katex .fontsize-ensurer.reset-size6.size9,
    .katex .sizing.reset-size6.size9 {
        font-size: 1.728em
    }

    .katex .fontsize-ensurer.reset-size6.size10,
    .katex .sizing.reset-size6.size10 {
        font-size: 2.074em
    }

    .katex .fontsize-ensurer.reset-size6.size11,
    .katex .sizing.reset-size6.size11 {
        font-size: 2.488em
    }

    .katex .fontsize-ensurer.reset-size7.size1,
    .katex .sizing.reset-size7.size1 {
        font-size: .41666667em
    }

    .katex .fontsize-ensurer.reset-size7.size2,
    .katex .sizing.reset-size7.size2 {
        font-size: .5em
    }

    .katex .fontsize-ensurer.reset-size7.size3,
    .katex .sizing.reset-size7.size3 {
        font-size: .58333333em
    }

    .katex .fontsize-ensurer.reset-size7.size4,
    .katex .sizing.reset-size7.size4 {
        font-size: .66666667em
    }

    .katex .fontsize-ensurer.reset-size7.size5,
    .katex .sizing.reset-size7.size5 {
        font-size: .75em
    }

    .katex .fontsize-ensurer.reset-size7.size6,
    .katex .sizing.reset-size7.size6 {
        font-size: .83333333em
    }

    .katex .fontsize-ensurer.reset-size7.size7,
    .katex .sizing.reset-size7.size7 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size7.size8,
    .katex .sizing.reset-size7.size8 {
        font-size: 1.2em
    }

    .katex .fontsize-ensurer.reset-size7.size9,
    .katex .sizing.reset-size7.size9 {
        font-size: 1.44em
    }

    .katex .fontsize-ensurer.reset-size7.size10,
    .katex .sizing.reset-size7.size10 {
        font-size: 1.72833333em
    }

    .katex .fontsize-ensurer.reset-size7.size11,
    .katex .sizing.reset-size7.size11 {
        font-size: 2.07333333em
    }

    .katex .fontsize-ensurer.reset-size8.size1,
    .katex .sizing.reset-size8.size1 {
        font-size: .34722222em
    }

    .katex .fontsize-ensurer.reset-size8.size2,
    .katex .sizing.reset-size8.size2 {
        font-size: .41666667em
    }

    .katex .fontsize-ensurer.reset-size8.size3,
    .katex .sizing.reset-size8.size3 {
        font-size: .48611111em
    }

    .katex .fontsize-ensurer.reset-size8.size4,
    .katex .sizing.reset-size8.size4 {
        font-size: .55555556em
    }

    .katex .fontsize-ensurer.reset-size8.size5,
    .katex .sizing.reset-size8.size5 {
        font-size: .625em
    }

    .katex .fontsize-ensurer.reset-size8.size6,
    .katex .sizing.reset-size8.size6 {
        font-size: .69444444em
    }

    .katex .fontsize-ensurer.reset-size8.size7,
    .katex .sizing.reset-size8.size7 {
        font-size: .83333333em
    }

    .katex .fontsize-ensurer.reset-size8.size8,
    .katex .sizing.reset-size8.size8 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size8.size9,
    .katex .sizing.reset-size8.size9 {
        font-size: 1.2em
    }

    .katex .fontsize-ensurer.reset-size8.size10,
    .katex .sizing.reset-size8.size10 {
        font-size: 1.44027778em
    }

    .katex .fontsize-ensurer.reset-size8.size11,
    .katex .sizing.reset-size8.size11 {
        font-size: 1.72777778em
    }

    .katex .fontsize-ensurer.reset-size9.size1,
    .katex .sizing.reset-size9.size1 {
        font-size: .28935185em
    }

    .katex .fontsize-ensurer.reset-size9.size2,
    .katex .sizing.reset-size9.size2 {
        font-size: .34722222em
    }

    .katex .fontsize-ensurer.reset-size9.size3,
    .katex .sizing.reset-size9.size3 {
        font-size: .40509259em
    }

    .katex .fontsize-ensurer.reset-size9.size4,
    .katex .sizing.reset-size9.size4 {
        font-size: .46296296em
    }

    .katex .fontsize-ensurer.reset-size9.size5,
    .katex .sizing.reset-size9.size5 {
        font-size: .52083333em
    }

    .katex .fontsize-ensurer.reset-size9.size6,
    .katex .sizing.reset-size9.size6 {
        font-size: .5787037em
    }

    .katex .fontsize-ensurer.reset-size9.size7,
    .katex .sizing.reset-size9.size7 {
        font-size: .69444444em
    }

    .katex .fontsize-ensurer.reset-size9.size8,
    .katex .sizing.reset-size9.size8 {
        font-size: .83333333em
    }

    .katex .fontsize-ensurer.reset-size9.size9,
    .katex .sizing.reset-size9.size9 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size9.size10,
    .katex .sizing.reset-size9.size10 {
        font-size: 1.20023148em
    }

    .katex .fontsize-ensurer.reset-size9.size11,
    .katex .sizing.reset-size9.size11 {
        font-size: 1.43981481em
    }

    .katex .fontsize-ensurer.reset-size10.size1,
    .katex .sizing.reset-size10.size1 {
        font-size: .24108004em
    }

    .katex .fontsize-ensurer.reset-size10.size2,
    .katex .sizing.reset-size10.size2 {
        font-size: .28929605em
    }

    .katex .fontsize-ensurer.reset-size10.size3,
    .katex .sizing.reset-size10.size3 {
        font-size: .33751205em
    }

    .katex .fontsize-ensurer.reset-size10.size4,
    .katex .sizing.reset-size10.size4 {
        font-size: .38572806em
    }

    .katex .fontsize-ensurer.reset-size10.size5,
    .katex .sizing.reset-size10.size5 {
        font-size: .43394407em
    }

    .katex .fontsize-ensurer.reset-size10.size6,
    .katex .sizing.reset-size10.size6 {
        font-size: .48216008em
    }

    .katex .fontsize-ensurer.reset-size10.size7,
    .katex .sizing.reset-size10.size7 {
        font-size: .57859209em
    }

    .katex .fontsize-ensurer.reset-size10.size8,
    .katex .sizing.reset-size10.size8 {
        font-size: .69431051em
    }

    .katex .fontsize-ensurer.reset-size10.size9,
    .katex .sizing.reset-size10.size9 {
        font-size: .83317261em
    }

    .katex .fontsize-ensurer.reset-size10.size10,
    .katex .sizing.reset-size10.size10 {
        font-size: 1em
    }

    .katex .fontsize-ensurer.reset-size10.size11,
    .katex .sizing.reset-size10.size11 {
        font-size: 1.19961427em
    }

    .katex .fontsize-ensurer.reset-size11.size1,
    .katex .sizing.reset-size11.size1 {
        font-size: .20096463em
    }

    .katex .fontsize-ensurer.reset-size11.size2,
    .katex .sizing.reset-size11.size2 {
        font-size: .24115756em
    }

    .katex .fontsize-ensurer.reset-size11.size3,
    .katex .sizing.reset-size11.size3 {
        font-size: .28135048em
    }

    .katex .fontsize-ensurer.reset-size11.size4,
    .katex .sizing.reset-size11.size4 {
        font-size: .32154341em
    }

    .katex .fontsize-ensurer.reset-size11.size5,
    .katex .sizing.reset-size11.size5 {
        font-size: .36173633em
    }

    .katex .fontsize-ensurer.reset-size11.size6,
    .katex .sizing.reset-size11.size6 {
        font-size: .40192926em
    }

    .katex .fontsize-ensurer.reset-size11.size7,
    .katex .sizing.reset-size11.size7 {
        font-size: .48231511em
    }

    .katex .fontsize-ensurer.reset-size11.size8,
    .katex .sizing.reset-size11.size8 {
        font-size: .57877814em
    }

    .katex .fontsize-ensurer.reset-size11.size9,
    .katex .sizing.reset-size11.size9 {
        font-size: .69453376em
    }

    .katex .fontsize-ensurer.reset-size11.size10,
    .katex .sizing.reset-size11.size10 {
        font-size: .83360129em
    }

    .katex .fontsize-ensurer.reset-size11.size11,
    .katex .sizing.reset-size11.size11 {
        font-size: 1em
    }

    .katex .delimsizing.size1 {
        font-family: KaTeX_Size1
    }

    .katex .delimsizing.size2 {
        font-family: KaTeX_Size2
    }

    .katex .delimsizing.size3 {
        font-family: KaTeX_Size3
    }

    .katex .delimsizing.size4 {
        font-family: KaTeX_Size4
    }

    .katex .delimsizing.mult .delim-size1>span {
        font-family: KaTeX_Size1
    }

    .katex .delimsizing.mult .delim-size4>span {
        font-family: KaTeX_Size4
    }

    .katex .nulldelimiter {
        display: inline-block;
        width: .12em
    }

    .katex .delimcenter,
    .katex .op-symbol {
        position: relative
    }

    .katex .op-symbol.small-op {
        font-family: KaTeX_Size1
    }

    .katex .op-symbol.large-op {
        font-family: KaTeX_Size2
    }

    .katex .accent>.vlist-t,
    .katex .op-limits>.vlist-t {
        text-align: center
    }

    .katex .accent .accent-body {
        position: relative
    }

    .katex .accent .accent-body:not(.accent-full) {
        width: 0
    }

    .katex .overlay {
        display: block
    }

    .katex .mtable .vertical-separator {
        display: inline-block;
        min-width: 1px
    }

    .katex .mtable .arraycolsep {
        display: inline-block
    }

    .katex .mtable .col-align-c>.vlist-t {
        text-align: center
    }

    .katex .mtable .col-align-l>.vlist-t {
        text-align: left
    }

    .katex .mtable .col-align-r>.vlist-t {
        text-align: right
    }

    .katex .svg-align {
        text-align: left
    }

    .katex svg {
        fill: currentColor;
        stroke: currentColor;
        fill-rule: nonzero;
        fill-opacity: 1;
        stroke-width: 1;
        stroke-linecap: butt;
        stroke-linejoin: miter;
        stroke-miterlimit: 4;
        stroke-dasharray: none;
        stroke-dashoffset: 0;
        stroke-opacity: 1;
        display: block;
        height: inherit;
        position: absolute;
        width: 100%
    }

    .katex svg path {
        stroke: none
    }

    .katex img {
        border-style: none;
        max-height: none;
        max-width: none;
        min-height: 0;
        min-width: 0
    }

    .katex .stretchy {
        display: block;
        overflow: hidden;
        position: relative;
        width: 100%
    }

    .katex .stretchy:after,
    .katex .stretchy:before {
        content: ""
    }

    .katex .hide-tail {
        overflow: hidden;
        position: relative;
        width: 100%
    }

    .katex .halfarrow-left {
        left: 0;
        overflow: hidden;
        position: absolute;
        width: 50.2%
    }

    .katex .halfarrow-right {
        overflow: hidden;
        position: absolute;
        right: 0;
        width: 50.2%
    }

    .katex .brace-left {
        left: 0;
        overflow: hidden;
        position: absolute;
        width: 25.1%
    }

    .katex .brace-center {
        left: 25%;
        overflow: hidden;
        position: absolute;
        width: 50%
    }

    .katex .brace-right {
        overflow: hidden;
        position: absolute;
        right: 0;
        width: 25.1%
    }

    .katex .x-arrow-pad {
        padding: 0 .5em
    }

    .katex .cd-arrow-pad {
        padding: 0 .55556em 0 .27778em
    }

    .katex .mover,
    .katex .munder,
    .katex .x-arrow {
        text-align: center
    }

    .katex .boxpad {
        padding: 0 .3em
    }

    .katex .fbox,
    .katex .fcolorbox {
        border: .04em solid;
        box-sizing: border-box
    }

    .katex .cancel-pad {
        padding: 0 .2em
    }

    .katex .cancel-lap {
        margin-left: -.2em;
        margin-right: -.2em
    }

    .katex .sout {
        border-bottom-style: solid;
        border-bottom-width: .08em
    }

    .katex .angl {
        border-right: .049em solid;
        border-top: .049em solid;
        box-sizing: border-box;
        margin-right: .03889em
    }

    .katex .anglpad {
        padding: 0 .03889em
    }

    .katex .eqn-num:before {
        content: "(" counter(katexEqnNo) ")";
        counter-increment: katexEqnNo
    }

    .katex .mml-eqn-num:before {
        content: "(" counter(mmlEqnNo) ")";
        counter-increment: mmlEqnNo
    }

    .katex .mtr-glue {
        width: 50%
    }

    .katex .cd-vert-arrow {
        display: inline-block;
        position: relative
    }

    .katex .cd-label-left {
        display: inline-block;
        position: absolute;
        right: calc(50% + .3em);
        text-align: left
    }

    .katex .cd-label-right {
        display: inline-block;
        left: calc(50% + .3em);
        position: absolute;
        text-align: right
    }

    .katex-display {
        display: block;
        margin: 1em 0;
        text-align: center
    }

    .katex-display>.katex {
        display: block;
        text-align: center;
        white-space: nowrap
    }

    .katex-display>.katex>.katex-html {
        display: block;
        position: relative
    }

    .katex-display>.katex>.katex-html>.tag {
        position: absolute;
        right: 0
    }

    .katex-display.leqno>.katex>.katex-html>.tag {
        left: 0;
        right: auto
    }

    .katex-display.fleqn>.katex {
        padding-left: 2em;
        text-align: left
    }

    body {
        counter-reset: katexEqnNo mmlEqnNo
    }

    /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL25vZGVfbW9kdWxlcy9rYXRleC9kaXN0L2thdGV4Lm1pbi5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsNktBQTJKLENBQUMsV0FBVyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsNktBQTBLLENBQUMsV0FBVyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsNktBQW1MLENBQUMsV0FBVyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsK0tBQThKLENBQUMsV0FBVyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQXVLLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQXFKLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQXVLLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQTJKLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQThKLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQXVLLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQTJKLENBQUMsV0FBVyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQW9LLENBQUMsV0FBVyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQTBLLENBQUMsV0FBVyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQTZLLENBQUMsV0FBVyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsZ0xBQW9LLENBQUMsV0FBVyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxl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LENBQUMsZUFBZSxhQUFhLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixhQUFhLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsa0NBQWtDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyx1Q0FBdUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxNQUFNLENBQUMsVUFBVSxDQUFDLDRCQUE0QixnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJAZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX0FNUztmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7c3JjOnVybChmb250cy9LYVRlWF9BTVMtUmVndWxhci53b2ZmMikgZm9ybWF0KFwid29mZjJcIiksdXJsKGZvbnRzL0thVGVYX0FNUy1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX0FNUy1SZWd1bGFyLnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIil9QGZvbnQtZmFjZXtmb250LWZhbWlseTpLYVRlWF9DYWxpZ3JhcGhpYztmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo3MDA7c3JjOnVybChmb250cy9LYVRlWF9DYWxpZ3JhcGhpYy1Cb2xkLndvZmYyKSBmb3JtYXQoXCJ3b2ZmMlwiKSx1cmwoZm9udHMvS2FUZVhfQ2FsaWdyYXBoaWMtQm9sZC53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9DYWxpZ3JhcGhpYy1Cb2xkLnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIil9QGZvbnQtZmFjZXtmb250LWZhbWlseTpLYVRlWF9DYWxpZ3JhcGhpYztmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7c3JjOnVybChmb250cy9LYVRlWF9DYWxpZ3JhcGhpYy1SZWd1bGFyLndvZmYyKSBmb3JtYXQoXCJ3b2ZmMlwiKSx1cmwoZm9udHMvS2FUZVhfQ2FsaWdyYXBoaWMtUmVndWxhci53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9DYWxpZ3JhcGhpYy1SZWd1bGFyLnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIil9QGZvbnQtZmFjZXtmb250LWZhbWlseTpLYVRlWF9GcmFrdHVyO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjcwMDtzcmM6dXJsKGZvbnRzL0thVGVYX0ZyYWt0dXItQm9sZC53b2ZmMikgZm9ybWF0KFwid29mZjJcIiksdXJsKGZvbnRzL0thVGVYX0ZyYWt0dXItQm9sZC53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9GcmFrdHVyLUJvbGQudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX0ZyYWt0dXI7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3NyYzp1cmwoZm9udHMvS2FUZVhfRnJha3R1ci1SZWd1bGFyLndvZmYyKSBmb3JtYXQoXCJ3b2ZmMlwiKSx1cmwoZm9udHMvS2FUZVhfRnJha3R1ci1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX0ZyYWt0dXItUmVndWxhci50dGYpIGZvcm1hdChcInRydWV0eXBlXCIpfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6S2FUZVhfTWFpbjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo3MDA7c3JjOnVybChmb250cy9LYVRlWF9NYWluLUJvbGQud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9NYWluLUJvbGQud29mZikgZm9ybWF0KFwid29mZlwiKSx1cmwoZm9udHMvS2FUZVhfTWFpbi1Cb2xkLnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIil9QGZvbnQtZmFjZXtmb250LWZhbWlseTpLYVRlWF9NYWluO2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtd2VpZ2h0OjcwMDtzcmM6dXJsKGZvbnRzL0thVGVYX01haW4tQm9sZEl0YWxpYy53b2ZmMikgZm9ybWF0KFwid29mZjJcIiksdXJsKGZvbnRzL0thVGVYX01haW4tQm9sZEl0YWxpYy53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9NYWluLUJvbGRJdGFsaWMudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX01haW47Zm9udC1zdHlsZTppdGFsaWM7Zm9udC13ZWlnaHQ6NDAwO3NyYzp1cmwoZm9udHMvS2FUZVhfTWFpbi1JdGFsaWMud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9NYWluLUl0YWxpYy53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9NYWluLUl0YWxpYy50dGYpIGZvcm1hdChcInRydWV0eXBlXCIpfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6S2FUZVhfTWFpbjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7c3JjOnVybChmb250cy9LYVRlWF9NYWluLVJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9NYWluLVJlZ3VsYXIud29mZikgZm9ybWF0KFwid29mZlwiKSx1cmwoZm9udHMvS2FUZVhfTWFpbi1SZWd1bGFyLnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIil9QGZvbnQtZmFjZXtmb250LWZhbWlseTpLYVRlWF9NYXRoO2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtd2VpZ2h0OjcwMDtzcmM6dXJsKGZvbnRzL0thVGVYX01hdGgtQm9sZEl0YWxpYy53b2ZmMikgZm9ybWF0KFwid29mZjJcIiksdXJsKGZvbnRzL0thVGVYX01hdGgtQm9sZEl0YWxpYy53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9NYXRoLUJvbGRJdGFsaWMudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX01hdGg7Zm9udC1zdHlsZTppdGFsaWM7Zm9udC13ZWlnaHQ6NDAwO3NyYzp1cmwoZm9udHMvS2FUZVhfTWF0aC1JdGFsaWMud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9NYXRoLUl0YWxpYy53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9NYXRoLUl0YWxpYy50dGYpIGZvcm1hdChcInRydWV0eXBlXCIpfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6XCJLYVRlWF9TYW5zU2VyaWZcIjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo3MDA7c3JjOnVybChmb250cy9LYVRlWF9TYW5zU2VyaWYtQm9sZC53b2ZmMikgZm9ybWF0KFwid29mZjJcIiksdXJsKGZvbnRzL0thVGVYX1NhbnNTZXJpZi1Cb2xkLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1NhbnNTZXJpZi1Cb2xkLnR0ZikgZm9ybWF0KFwidHJ1ZXR5cGVcIil9QGZvbnQtZmFjZXtmb250LWZhbWlseTpcIkthVGVYX1NhbnNTZXJpZlwiO2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKGZvbnRzL0thVGVYX1NhbnNTZXJpZi1JdGFsaWMud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9TYW5zU2VyaWYtSXRhbGljLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1NhbnNTZXJpZi1JdGFsaWMudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OlwiS2FUZVhfU2Fuc1NlcmlmXCI7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3NyYzp1cmwoZm9udHMvS2FUZVhfU2Fuc1NlcmlmLVJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9TYW5zU2VyaWYtUmVndWxhci53b2ZmKSBmb3JtYXQoXCJ3b2ZmXCIpLHVybChmb250cy9LYVRlWF9TYW5zU2VyaWYtUmVndWxhci50dGYpIGZvcm1hdChcInRydWV0eXBlXCIpfUBmb250LWZhY2V7Zm9udC1mYW1pbHk6S2FUZVhfU2NyaXB0O2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKGZvbnRzL0thVGVYX1NjcmlwdC1SZWd1bGFyLndvZmYyKSBmb3JtYXQoXCJ3b2ZmMlwiKSx1cmwoZm9udHMvS2FUZVhfU2NyaXB0LVJlZ3VsYXIud29mZikgZm9ybWF0KFwid29mZlwiKSx1cmwoZm9udHMvS2FUZVhfU2NyaXB0LVJlZ3VsYXIudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX1NpemUxO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKGZvbnRzL0thVGVYX1NpemUxLVJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9TaXplMS1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1NpemUxLVJlZ3VsYXIudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX1NpemUyO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKGZvbnRzL0thVGVYX1NpemUyLVJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9TaXplMi1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1NpemUyLVJlZ3VsYXIudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX1NpemUzO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKGZvbnRzL0thVGVYX1NpemUzLVJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9TaXplMy1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1NpemUzLVJlZ3VsYXIudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX1NpemU0O2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKGZvbnRzL0thVGVYX1NpemU0LVJlZ3VsYXIud29mZjIpIGZvcm1hdChcIndvZmYyXCIpLHVybChmb250cy9LYVRlWF9TaXplNC1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1NpemU0LVJlZ3VsYXIudHRmKSBmb3JtYXQoXCJ0cnVldHlwZVwiKX1AZm9udC1mYWNle2ZvbnQtZmFtaWx5OkthVGVYX1R5cGV3cml0ZXI7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3NyYzp1cmwoZm9udHMvS2FUZVhfVHlwZXdyaXRlci1SZWd1bGFyLndvZmYyKSBmb3JtYXQoXCJ3b2ZmMlwiKSx1cmwoZm9udHMvS2FUZVhfVHlwZXdyaXRlci1SZWd1bGFyLndvZmYpIGZvcm1hdChcIndvZmZcIiksdXJsKGZvbnRzL0thVGVYX1R5cGV3cml0ZXItUmVndWxhci50dGYpIGZvcm1hdChcInRydWV0eXBlXCIpfS5rYXRleHt0ZXh0LXJlbmRlcmluZzphdXRvO2ZvbnQ6bm9ybWFsIDEuMjFlbSBLYVRlWF9NYWluLFRpbWVzIE5ldyBSb21hbixzZXJpZjtsaW5lLWhlaWdodDoxLjI7dGV4dC1pbmRlbnQ6MH0ua2F0ZXggKnstbXMtaGlnaC1jb250cmFzdC1hZGp1c3Q6bm9uZSFpbXBvcnRhbnQ7Ym9yZGVyLWNvbG9yOmN1cnJlbnRDb2xvcn0ua2F0ZXggLmthdGV4LXZlcnNpb246YWZ0ZXJ7Y29udGVudDpcIjAuMTYuOVwifS5rYXRleCAua2F0ZXgtbWF0aG1se2NsaXA6cmVjdCgxcHgsMXB4LDFweCwxcHgpO2JvcmRlcjowO2hlaWdodDoxcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHh9LmthdGV4IC5rYXRleC1odG1sPi5uZXdsaW5le2Rpc3BsYXk6YmxvY2t9LmthdGV4IC5iYXNle3Bvc2l0aW9uOnJlbGF0aXZlO3doaXRlLXNwYWNlOm5vd3JhcDt3aWR0aDotd2Via2l0LW1pbi1jb250ZW50O3dpZHRoOi1tb3otbWluLWNvbnRlbnQ7d2lkdGg6bWluLWNvbnRlbnR9LmthdGV4IC5iYXNlLC5rYXRleCAuc3RydXR7ZGlzcGxheTppbmxpbmUtYmxvY2t9LmthdGV4IC50ZXh0YmZ7Zm9udC13ZWlnaHQ6NzAwfS5rYXRleCAudGV4dGl0e2ZvbnQtc3R5bGU6aXRhbGljfS5rYXRleCAudGV4dHJte2ZvbnQtZmFtaWx5OkthVGVYX01haW59LmthdGV4IC50ZXh0c2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmfS5rYXRleCAudGV4dHR0e2ZvbnQtZmFtaWx5OkthVGVYX1R5cGV3cml0ZXJ9LmthdGV4IC5tYXRobm9ybWFse2ZvbnQtZmFtaWx5OkthVGVYX01hdGg7Zm9udC1zdHlsZTppdGFsaWN9LmthdGV4IC5tYXRoaXR7Zm9udC1mYW1pbHk6S2FUZVhfTWFpbjtmb250LXN0eWxlOml0YWxpY30ua2F0ZXggLm1hdGhybXtmb250LXN0eWxlOm5vcm1hbH0ua2F0ZXggLm1hdGhiZntmb250LWZhbWlseTpLYVRlWF9NYWluO2ZvbnQtd2VpZ2h0OjcwMH0ua2F0ZXggLmJvbGRzeW1ib2x7Zm9udC1mYW1pbHk6S2FUZVhfTWF0aDtmb250LXN0eWxlOml0YWxpYztmb250LXdlaWdodDo3MDB9LmthdGV4IC5hbXNybSwua2F0ZXggLm1hdGhiYiwua2F0ZXggLnRleHRiYntmb250LWZhbWlseTpLYVRlWF9BTVN9LmthdGV4IC5tYXRoY2Fse2ZvbnQtZmFtaWx5OkthVGVYX0NhbGlncmFwaGljfS5rYXRleCAubWF0aGZyYWssLmthdGV4IC50ZXh0ZnJha3tmb250LWZhbWlseTpLYVRlWF9GcmFrdHVyfS5rYXRleCAubWF0aGJvbGRmcmFrLC5rYXRleCAudGV4dGJvbGRmcmFre2ZvbnQtZmFtaWx5OkthVGVYX0ZyYWt0dXI7Zm9udC13ZWlnaHQ6NzAwfS5rYXRleCAubWF0aHR0e2ZvbnQtZmFtaWx5OkthVGVYX1R5cGV3cml0ZXJ9LmthdGV4IC5tYXRoc2NyLC5rYXRleCAudGV4dHNjcntmb250LWZhbWlseTpLYVRlWF9TY3JpcHR9LmthdGV4IC5tYXRoc2YsLmthdGV4IC50ZXh0c2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmfS5rYXRleCAubWF0aGJvbGRzZiwua2F0ZXggLnRleHRib2xkc2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmO2ZvbnQtd2VpZ2h0OjcwMH0ua2F0ZXggLm1hdGhpdHNmLC5rYXRleCAudGV4dGl0c2Z7Zm9udC1mYW1pbHk6S2FUZVhfU2Fuc1NlcmlmO2ZvbnQtc3R5bGU6aXRhbGljfS5rYXRleCAubWFpbnJte2ZvbnQtZmFtaWx5OkthVGVYX01haW47Zm9udC1zdHlsZTpub3JtYWx9LmthdGV4IC52bGlzdC10e2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtkaXNwbGF5OmlubGluZS10YWJsZTt0YWJsZS1sYXlvdXQ6Zml4ZWR9LmthdGV4IC52bGlzdC1ye2Rpc3BsYXk6dGFibGUtcm93fS5rYXRleCAudmxpc3R7ZGlzcGxheTp0YWJsZS1jZWxsO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ua2F0ZXggLnZsaXN0PnNwYW57ZGlzcGxheTpibG9jaztoZWlnaHQ6MDtwb3NpdGlvbjpyZWxhdGl2ZX0ua2F0ZXggLnZsaXN0PnNwYW4+c3BhbntkaXNwbGF5OmlubGluZS1ibG9ja30ua2F0ZXggLnZsaXN0PnNwYW4+LnBzdHJ1dHtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MH0ua2F0ZXggLnZsaXN0LXQye21hcmdpbi1yaWdodDotMnB4fS5rYXRleCAudmxpc3Qtc3tkaXNwbGF5OnRhYmxlLWNlbGw7Zm9udC1zaXplOjFweDttaW4td2lkdGg6MnB4O3ZlcnRpY2FsLWFsaWduOmJvdHRvbTt3aWR0aDoycHh9LmthdGV4IC52Ym94e2FsaWduLWl0ZW1zOmJhc2VsaW5lO2Rpc3BsYXk6aW5saW5lLWZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufS5rYXRleCAuaGJveHt3aWR0aDoxMDAlfS5rYXRleCAuaGJveCwua2F0ZXggLnRoaW5ib3h7ZGlzcGxheTppbmxpbmUtZmxleDtmbGV4LWRpcmVjdGlvbjpyb3d9LmthdGV4IC50aGluYm94e21heC13aWR0aDowO3dpZHRoOjB9LmthdGV4IC5tc3Vwc3Vie3RleHQtYWxpZ246bGVmdH0ua2F0ZXggLm1mcmFjPnNwYW4+c3Bhbnt0ZXh0LWFsaWduOmNlbnRlcn0ua2F0ZXggLm1mcmFjIC5mcmFjLWxpbmV7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlfS5rYXRleCAuaGRhc2hsaW5lLC5rYXRleCAuaGxpbmUsLmthdGV4IC5tZnJhYyAuZnJhYy1saW5lLC5rYXRleCAub3ZlcmxpbmUgLm92ZXJsaW5lLWxpbmUsLmthdGV4IC5ydWxlLC5rYXRleCAudW5kZXJsaW5lIC51bmRlcmxpbmUtbGluZXttaW4taGVpZ2h0OjFweH0ua2F0ZXggLm1zcGFjZXtkaXNwbGF5OmlubGluZS1ibG9ja30ua2F0ZXggLmNsYXAsLmthdGV4IC5sbGFwLC5rYXRleCAucmxhcHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDowfS5rYXRleCAuY2xhcD4uaW5uZXIsLmthdGV4IC5sbGFwPi5pbm5lciwua2F0ZXggLnJsYXA+LmlubmVye3Bvc2l0aW9uOmFic29sdXRlfS5rYXRleCAuY2xhcD4uZml4LC5rYXRleCAubGxhcD4uZml4LC5rYXRleCAucmxhcD4uZml4e2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5rYXRleCAubGxhcD4uaW5uZXJ7cmlnaHQ6MH0ua2F0ZXggLmNsYXA+LmlubmVyLC5rYXRleCAucmxhcD4uaW5uZXJ7bGVmdDowfS5rYXRleCAuY2xhcD4uaW5uZXI+c3BhbnttYXJnaW4tbGVmdDotNTAlO21hcmdpbi1yaWdodDo1MCV9LmthdGV4IC5ydWxle2JvcmRlcjowIHNvbGlkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5rYXRleCAuaGxpbmUsLmthdGV4IC5vdmVybGluZSAub3ZlcmxpbmUtbGluZSwua2F0ZXggLnVuZGVybGluZSAudW5kZXJsaW5lLWxpbmV7Ym9yZGVyLWJvdHRvbS1zdHlsZTpzb2xpZDtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMDAlfS5rYXRleCAuaGRhc2hsaW5le2JvcmRlci1ib3R0b20tc3R5bGU6ZGFzaGVkO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjEwMCV9LmthdGV4IC5zcXJ0Pi5yb290e21hcmdpbi1sZWZ0Oi4yNzc3Nzc3OGVtO21hcmdpbi1yaWdodDotLjU1NTU1NTU2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxLnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUxe2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxLnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUye2ZvbnQtc2l6ZToxLjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTMsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEuc2l6ZTN7Zm9udC1zaXplOjEuNGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMS5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMS5zaXplNHtmb250LXNpemU6MS42ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxLnNpemU1LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemU1e2ZvbnQtc2l6ZToxLjhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEuc2l6ZTZ7Zm9udC1zaXplOjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEuc2l6ZTd7Zm9udC1zaXplOjIuNGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMS5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMS5zaXplOHtmb250LXNpemU6Mi44OGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMS5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMS5zaXplOXtmb250LXNpemU6My40NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUxMHtmb250LXNpemU6NC4xNDhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEuc2l6ZTExLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxLnNpemUxMXtmb250LXNpemU6NC45NzZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTIuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTIuc2l6ZTF7Zm9udC1zaXplOi44MzMzMzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplMiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplMntmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplM3tmb250LXNpemU6MS4xNjY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplNHtmb250LXNpemU6MS4zMzMzMzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplNSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMi5zaXplNXtmb250LXNpemU6MS41ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUyLnNpemU2LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemU2e2ZvbnQtc2l6ZToxLjY2NjY2NjY3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUyLnNpemU3LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemU3e2ZvbnQtc2l6ZToyZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUyLnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemU4e2ZvbnQtc2l6ZToyLjRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTIuc2l6ZTksLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTIuc2l6ZTl7Zm9udC1zaXplOjIuODhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTIuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUyLnNpemUxMHtmb250LXNpemU6My40NTY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMi5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTIuc2l6ZTExe2ZvbnQtc2l6ZTo0LjE0NjY2NjY3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUzLnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUzLnNpemUxe2ZvbnQtc2l6ZTouNzE0Mjg1NzFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTMuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTMuc2l6ZTJ7Zm9udC1zaXplOi44NTcxNDI4NmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplM3tmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplNHtmb250LXNpemU6MS4xNDI4NTcxNGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplNXtmb250LXNpemU6MS4yODU3MTQyOWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplNntmb250LXNpemU6MS40Mjg1NzE0M2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplN3tmb250LXNpemU6MS43MTQyODU3MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplOHtmb250LXNpemU6Mi4wNTcxNDI4NmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplOXtmb250LXNpemU6Mi40Njg1NzE0M2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMy5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTMuc2l6ZTEwe2ZvbnQtc2l6ZToyLjk2Mjg1NzE0ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUzLnNpemUxMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMy5zaXplMTF7Zm9udC1zaXplOjMuNTU0Mjg1NzFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTF7Zm9udC1zaXplOi42MjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTJ7Zm9udC1zaXplOi43NWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplM3tmb250LXNpemU6Ljg3NWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplNHtmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplNSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplNXtmb250LXNpemU6MS4xMjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTZ7Zm9udC1zaXplOjEuMjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTQuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTd7Zm9udC1zaXplOjEuNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplOHtmb250LXNpemU6MS44ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU0LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU0LnNpemU5e2ZvbnQtc2l6ZToyLjE2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU0LnNpemUxMCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNC5zaXplMTB7Zm9udC1zaXplOjIuNTkyNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNC5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTQuc2l6ZTExe2ZvbnQtc2l6ZTozLjExZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU1LnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU1LnNpemUxe2ZvbnQtc2l6ZTouNTU1NTU1NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTJ7Zm9udC1zaXplOi42NjY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNS5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNS5zaXplM3tmb250LXNpemU6Ljc3Nzc3Nzc4ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU1LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU1LnNpemU0e2ZvbnQtc2l6ZTouODg4ODg4ODllbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTV7Zm9udC1zaXplOjFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTZ7Zm9udC1zaXplOjEuMTExMTExMTFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTd7Zm9udC1zaXplOjEuMzMzMzMzMzNlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTUuc2l6ZTgsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTh7Zm9udC1zaXplOjEuNmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNS5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNS5zaXplOXtmb250LXNpemU6MS45MmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNS5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTUuc2l6ZTEwe2ZvbnQtc2l6ZToyLjMwNDQ0NDQ0ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU1LnNpemUxMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNS5zaXplMTF7Zm9udC1zaXplOjIuNzY0NDQ0NDRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTYuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTF7Zm9udC1zaXplOi41ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemUye2ZvbnQtc2l6ZTouNmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNi5zaXplM3tmb250LXNpemU6LjdlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTYuc2l6ZTQsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTR7Zm9udC1zaXplOi44ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemU1LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemU1e2ZvbnQtc2l6ZTouOWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNi5zaXplNntmb250LXNpemU6MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNi5zaXplN3tmb250LXNpemU6MS4yZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemU4e2ZvbnQtc2l6ZToxLjQ0ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU2LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU2LnNpemU5e2ZvbnQtc2l6ZToxLjcyOGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTEwe2ZvbnQtc2l6ZToyLjA3NGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNi5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTYuc2l6ZTExe2ZvbnQtc2l6ZToyLjQ4OGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNy5zaXplMXtmb250LXNpemU6LjQxNjY2NjY3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemUye2ZvbnQtc2l6ZTouNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplNy5zaXplM3tmb250LXNpemU6LjU4MzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemU0e2ZvbnQtc2l6ZTouNjY2NjY2NjdlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTcuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTcuc2l6ZTV7Zm9udC1zaXplOi43NWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplNy5zaXplNntmb250LXNpemU6LjgzMzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemU3LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemU3e2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU3LnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemU4e2ZvbnQtc2l6ZToxLjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTcuc2l6ZTksLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTcuc2l6ZTl7Zm9udC1zaXplOjEuNDRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTcuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU3LnNpemUxMHtmb250LXNpemU6MS43MjgzMzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplNy5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTcuc2l6ZTExe2ZvbnQtc2l6ZToyLjA3MzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemUxe2ZvbnQtc2l6ZTouMzQ3MjIyMjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTJ7Zm9udC1zaXplOi40MTY2NjY2N2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOC5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplOC5zaXplM3tmb250LXNpemU6LjQ4NjExMTExZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemU0e2ZvbnQtc2l6ZTouNTU1NTU1NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTV7Zm9udC1zaXplOi42MjVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTYsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTZ7Zm9udC1zaXplOi42OTQ0NDQ0NGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOC5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplOC5zaXplN3tmb250LXNpemU6LjgzMzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemU4e2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU4LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemU5e2ZvbnQtc2l6ZToxLjJlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTguc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU4LnNpemUxMHtmb250LXNpemU6MS40NDAyNzc3OGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOC5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTguc2l6ZTExe2ZvbnQtc2l6ZToxLjcyNzc3Nzc4ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemUxLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemUxe2ZvbnQtc2l6ZTouMjg5MzUxODVlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTkuc2l6ZTJ7Zm9udC1zaXplOi4zNDcyMjIyMmVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOS5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplM3tmb250LXNpemU6LjQwNTA5MjU5ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemU0LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemU0e2ZvbnQtc2l6ZTouNDYyOTYyOTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTkuc2l6ZTV7Zm9udC1zaXplOi41MjA4MzMzM2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOS5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplNntmb250LXNpemU6LjU3ODcwMzdlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTkuc2l6ZTd7Zm9udC1zaXplOi42OTQ0NDQ0NGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplOS5zaXplOCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplOHtmb250LXNpemU6LjgzMzMzMzMzZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemU5e2ZvbnQtc2l6ZToxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemU5LnNpemUxMCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplOS5zaXplMTB7Zm9udC1zaXplOjEuMjAwMjMxNDhlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTkuc2l6ZTExLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemU5LnNpemUxMXtmb250LXNpemU6MS40Mzk4MTQ4MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEwLnNpemUxe2ZvbnQtc2l6ZTouMjQxMDgwMDRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemUyLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplMntmb250LXNpemU6LjI4OTI5NjA1ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMC5zaXplMywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTN7Zm9udC1zaXplOi4zMzc1MTIwNWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTQsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEwLnNpemU0e2ZvbnQtc2l6ZTouMzg1NzI4MDZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemU1LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplNXtmb250LXNpemU6LjQzMzk0NDA3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMC5zaXplNiwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTZ7Zm9udC1zaXplOi40ODIxNjAwOGVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTcsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTEwLnNpemU3e2ZvbnQtc2l6ZTouNTc4NTkyMDllbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemU4LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplOHtmb250LXNpemU6LjY5NDMxMDUxZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMC5zaXplOSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTl7Zm9udC1zaXplOi44MzMxNzI2MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTAuc2l6ZTEwLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMC5zaXplMTB7Zm9udC1zaXplOjFlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTEwLnNpemUxMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTAuc2l6ZTExe2ZvbnQtc2l6ZToxLjE5OTYxNDI3ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplMSwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTEuc2l6ZTF7Zm9udC1zaXplOi4yMDA5NjQ2M2VtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTEuc2l6ZTIsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemUye2ZvbnQtc2l6ZTouMjQxMTU3NTZlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTExLnNpemUzLC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMS5zaXplM3tmb250LXNpemU6LjI4MTM1MDQ4ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplNCwua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTEuc2l6ZTR7Zm9udC1zaXplOi4zMjE1NDM0MWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTEuc2l6ZTUsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemU1e2ZvbnQtc2l6ZTouMzYxNzM2MzNlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTExLnNpemU2LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMS5zaXplNntmb250LXNpemU6LjQwMTkyOTI2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplNywua2F0ZXggLnNpemluZy5yZXNldC1zaXplMTEuc2l6ZTd7Zm9udC1zaXplOi40ODIzMTUxMWVtfS5rYXRleCAuZm9udHNpemUtZW5zdXJlci5yZXNldC1zaXplMTEuc2l6ZTgsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemU4e2ZvbnQtc2l6ZTouNTc4Nzc4MTRlbX0ua2F0ZXggLmZvbnRzaXplLWVuc3VyZXIucmVzZXQtc2l6ZTExLnNpemU5LC5rYXRleCAuc2l6aW5nLnJlc2V0LXNpemUxMS5zaXplOXtmb250LXNpemU6LjY5NDUzMzc2ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplMTAsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemUxMHtmb250LXNpemU6LjgzMzYwMTI5ZW19LmthdGV4IC5mb250c2l6ZS1lbnN1cmVyLnJlc2V0LXNpemUxMS5zaXplMTEsLmthdGV4IC5zaXppbmcucmVzZXQtc2l6ZTExLnNpemUxMXtmb250LXNpemU6MWVtfS5rYXRleCAuZGVsaW1zaXppbmcuc2l6ZTF7Zm9udC1mYW1pbHk6S2FUZVhfU2l6ZTF9LmthdGV4IC5kZWxpbXNpemluZy5zaXplMntmb250LWZhbWlseTpLYVRlWF9TaXplMn0ua2F0ZXggLmRlbGltc2l6aW5nLnNpemUze2ZvbnQtZmFtaWx5OkthVGVYX1NpemUzfS5rYXRleCAuZGVsaW1zaXppbmcuc2l6ZTR7Zm9udC1mYW1pbHk6S2FUZVhfU2l6ZTR9LmthdGV4IC5kZWxpbXNpemluZy5tdWx0IC5kZWxpbS1zaXplMT5zcGFue2ZvbnQtZmFtaWx5OkthVGVYX1NpemUxfS5rYXRleCAuZGVsaW1zaXppbmcubXVsdCAuZGVsaW0tc2l6ZTQ+c3Bhbntmb250LWZhbWlseTpLYVRlWF9TaXplNH0ua2F0ZXggLm51bGxkZWxpbWl0ZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6LjEyZW19LmthdGV4IC5kZWxpbWNlbnRlciwua2F0ZXggLm9wLXN5bWJvbHtwb3NpdGlvbjpyZWxhdGl2ZX0ua2F0ZXggLm9wLXN5bWJvbC5zbWFsbC1vcHtmb250LWZhbWlseTpLYVRlWF9TaXplMX0ua2F0ZXggLm9wLXN5bWJvbC5sYXJnZS1vcHtmb250LWZhbWlseTpLYVRlWF9TaXplMn0ua2F0ZXggLmFjY2VudD4udmxpc3QtdCwua2F0ZXggLm9wLWxpbWl0cz4udmxpc3QtdHt0ZXh0LWFsaWduOmNlbnRlcn0ua2F0ZXggLmFjY2VudCAuYWNjZW50LWJvZHl7cG9zaXRpb246cmVsYXRpdmV9LmthdGV4IC5hY2NlbnQgLmFjY2VudC1ib2R5Om5vdCguYWNjZW50LWZ1bGwpe3dpZHRoOjB9LmthdGV4IC5vdmVybGF5e2Rpc3BsYXk6YmxvY2t9LmthdGV4IC5tdGFibGUgLnZlcnRpY2FsLXNlcGFyYXRvcntkaXNwbGF5OmlubGluZS1ibG9jazttaW4td2lkdGg6MXB4fS5rYXRleCAubXRhYmxlIC5hcnJheWNvbHNlcHtkaXNwbGF5OmlubGluZS1ibG9ja30ua2F0ZXggLm10YWJsZSAuY29sLWFsaWduLWM+LnZsaXN0LXR7dGV4dC1hbGlnbjpjZW50ZXJ9LmthdGV4IC5tdGFibGUgLmNvbC1hbGlnbi1sPi52bGlzdC10e3RleHQtYWxpZ246bGVmdH0ua2F0ZXggLm10YWJsZSAuY29sLWFsaWduLXI+LnZsaXN0LXR7dGV4dC1hbGlnbjpyaWdodH0ua2F0ZXggLnN2Zy1hbGlnbnt0ZXh0LWFsaWduOmxlZnR9LmthdGV4IHN2Z3tmaWxsOmN1cnJlbnRDb2xvcjtzdHJva2U6Y3VycmVudENvbG9yO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtkaXNwbGF5OmJsb2NrO2hlaWdodDppbmhlcml0O3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCV9LmthdGV4IHN2ZyBwYXRoe3N0cm9rZTpub25lfS5rYXRleCBpbWd7Ym9yZGVyLXN0eWxlOm5vbmU7bWF4LWhlaWdodDpub25lO21heC13aWR0aDpub25lO21pbi1oZWlnaHQ6MDttaW4td2lkdGg6MH0ua2F0ZXggLnN0cmV0Y2h5e2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmthdGV4IC5zdHJldGNoeTphZnRlciwua2F0ZXggLnN0cmV0Y2h5OmJlZm9yZXtjb250ZW50OlwiXCJ9LmthdGV4IC5oaWRlLXRhaWx7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmthdGV4IC5oYWxmYXJyb3ctbGVmdHtsZWZ0OjA7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjUwLjIlfS5rYXRleCAuaGFsZmFycm93LXJpZ2h0e292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3dpZHRoOjUwLjIlfS5rYXRleCAuYnJhY2UtbGVmdHtsZWZ0OjA7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjI1LjElfS5rYXRleCAuYnJhY2UtY2VudGVye2xlZnQ6MjUlO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDo1MCV9LmthdGV4IC5icmFjZS1yaWdodHtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt3aWR0aDoyNS4xJX0ua2F0ZXggLngtYXJyb3ctcGFke3BhZGRpbmc6MCAuNWVtfS5rYXRleCAuY2QtYXJyb3ctcGFke3BhZGRpbmc6MCAuNTU1NTZlbSAwIC4yNzc3OGVtfS5rYXRleCAubW92ZXIsLmthdGV4IC5tdW5kZXIsLmthdGV4IC54LWFycm93e3RleHQtYWxpZ246Y2VudGVyfS5rYXRleCAuYm94cGFke3BhZGRpbmc6MCAuM2VtfS5rYXRleCAuZmJveCwua2F0ZXggLmZjb2xvcmJveHtib3JkZXI6LjA0ZW0gc29saWQ7Ym94LXNpemluZzpib3JkZXItYm94fS5rYXRleCAuY2FuY2VsLXBhZHtwYWRkaW5nOjAgLjJlbX0ua2F0ZXggLmNhbmNlbC1sYXB7bWFyZ2luLWxlZnQ6LS4yZW07bWFyZ2luLXJpZ2h0Oi0uMmVtfS5rYXRleCAuc291dHtib3JkZXItYm90dG9tLXN0eWxlOnNvbGlkO2JvcmRlci1ib3R0b20td2lkdGg6LjA4ZW19LmthdGV4IC5hbmdse2JvcmRlci1yaWdodDouMDQ5ZW0gc29saWQ7Ym9yZGVyLXRvcDouMDQ5ZW0gc29saWQ7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbi1yaWdodDouMDM4ODllbX0ua2F0ZXggLmFuZ2xwYWR7cGFkZGluZzowIC4wMzg4OWVtfS5rYXRleCAuZXFuLW51bTpiZWZvcmV7Y29udGVudDpcIihcIiBjb3VudGVyKGthdGV4RXFuTm8pIFwiKVwiO2NvdW50ZXItaW5jcmVtZW50OmthdGV4RXFuTm99LmthdGV4IC5tbWwtZXFuLW51bTpiZWZvcmV7Y29udGVudDpcIihcIiBjb3VudGVyKG1tbEVxbk5vKSBcIilcIjtjb3VudGVyLWluY3JlbWVudDptbWxFcW5Ob30ua2F0ZXggLm10ci1nbHVle3dpZHRoOjUwJX0ua2F0ZXggLmNkLXZlcnQtYXJyb3d7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246cmVsYXRpdmV9LmthdGV4IC5jZC1sYWJlbC1sZWZ0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OmNhbGMoNTAlICsgLjNlbSk7dGV4dC1hbGlnbjpsZWZ0fS5rYXRleCAuY2QtbGFiZWwtcmlnaHR7ZGlzcGxheTppbmxpbmUtYmxvY2s7bGVmdDpjYWxjKDUwJSArIC4zZW0pO3Bvc2l0aW9uOmFic29sdXRlO3RleHQtYWxpZ246cmlnaHR9LmthdGV4LWRpc3BsYXl7ZGlzcGxheTpibG9jazttYXJnaW46MWVtIDA7dGV4dC1hbGlnbjpjZW50ZXJ9LmthdGV4LWRpc3BsYXk+LmthdGV4e2Rpc3BsYXk6YmxvY2s7dGV4dC1hbGlnbjpjZW50ZXI7d2hpdGUtc3BhY2U6bm93cmFwfS5rYXRleC1kaXNwbGF5Pi5rYXRleD4ua2F0ZXgtaHRtbHtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlfS5rYXRleC1kaXNwbGF5Pi5rYXRleD4ua2F0ZXgtaHRtbD4udGFne3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9LmthdGV4LWRpc3BsYXkubGVxbm8+LmthdGV4Pi5rYXRleC1odG1sPi50YWd7bGVmdDowO3JpZ2h0OmF1dG99LmthdGV4LWRpc3BsYXkuZmxlcW4+LmthdGV4e3BhZGRpbmctbGVmdDoyZW07dGV4dC1hbGlnbjpsZWZ0fWJvZHl7Y291bnRlci1yZXNldDprYXRleEVxbk5vIG1tbEVxbk5vfVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */
</style>
<style type="text/css">
    @font-face {
        font-family: Roboto;
        src: url("chrome-extension://mcgbeeipkmelnpldkobichboakdfaeon/css/Roboto-Regular.ttf");
    }
</style>
<style type="text/css">
</style>
</head>

<body class="sun-editor-editable" style="margin:10px auto !important; height:auto !important;"
    data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed="">
    
</body>

</html>`;

const editorOptions = {
  ltr: true,
  katex,
  toolbarContainer: "#menubar",
  buttonList: [
    ["undo", "redo"],
    ["removeFormat"],
    ["bold", "underline", "italic", "fontSize", "font"],
    // ["tag_blockquote"],
    // ["mention"],
    // ["heading"],
    ["fontColor", "hiliteColor", "formatBlock", "paragraphStyle", "blockquote"],
    ["strike", "subscript", "superscript"],
    ["indent", "outdent"],
    ["align"],
    ["list"],
    ["horizontalRule"],
    ["table", "link", "image", "imageGallery"],
    ["showBlocks", "codeView"],
    ["math"],
    ["preview", "print", "save", "template"],
  ],
  font: [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
  ],
  imageRotation: false,
  fontSize: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 42, 55, 60],
  colorList: [
    [
      "#ff0000",
      "#ff5e00",
      "#ffe400",
      "#abf200",
      "#00d8ff",
      "#0055ff",
      "#6600ff",
      "#ff00dd",
      "#000000",
      "#ffd8d8",
      "#fae0d4",
      "#faf4c0",
      "#e4f7ba",
      "#d4f4fa",
      "#d9e5ff",
      "#e8d9ff",
      "#ffd9fa",
      "#f1f1f1",
      "#ffa7a7",
      "#ffc19e",
      "#faed7d",
      "#cef279",
      "#b2ebf4",
      "#b2ccff",
      "#d1b2ff",
      "#ffb2f5",
      "#bdbdbd",
      "#f15f5f",
      "#f29661",
      "#e5d85c",
      "#bce55c",
      "#5cd1e5",
      "#6699ff",
      "#a366ff",
      "#f261df",
      "#8c8c8c",
      "#980000",
      "#993800",
      "#998a00",
      "#6b9900",
      "#008299",
      "#003399",
      "#3d0099",
      "#990085",
      "#353535",
      "#670000",
      "#662500",
      "#665c00",
      "#476600",
      "#005766",
      "#002266",
      "#290066",
      "#660058",
      "#222222",
    ],
  ],
  imageUploadUrl: "http://localhost:8080/chazki-gateway/orders/upload",
  imageGalleryUrl: "http://localhost:8080/chazki-gateway/orders/gallery",
};

export const TextEditor = () => {
  const editorRef = useRef();
  const contentRef = useRef();
  const [value, setValue] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [showVersion, setShowVersion] = useState(false);
  useEffect(() => {
    console.log(editorRef.current.editor);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const showFileModal = () => {
    setIsFileModalOpen(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e) => {
    setIsModalOpen(false);
    createNewFolder(e);
  };

  const handleFileOk = (e) => {
    setIsFileModalOpen(false);
    createNewFile(e);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleFileCancel = () => {
    setIsFileModalOpen(false);
  };

  // const onImageUploadError = (errorMessage, result, core) => {
  //   alert(errorMessage);
  // core.noticeOpen(errorMessage);
  // return false;
  // console.log('error!')
  // return true;
  // }
  useEffect(() => {
    // Update math equations when the editor content changes
    const editor = document.getElementById("pd-editor"); // Replace with your editor ID
    if (editor) {
      editor.addEventListener("input", () => {
        window.renderMathInElement(editor, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false },
          ],
        });
      });
    }
  }, []);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.innerHTML = value;
  }, [value]);
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  };
  const onChangeHandler = (content) => {
    // console.log(content);
    setValue(content);
    console.log("the conenct s", content);
  };
  const onsave = (dta) => {
    console.log("asdasd", dta);
  };
  const handlePrint = () => {
    const parser = new DOMParser();
    const document = parser.parseFromString(htmlTemplate, "text/html");
    console.log("testing...", document.body);
    var printWindow = window.open("", "", "height=400,width=800");
    printWindow.document.write(document.body.innerHTML.toString());
    printWindow.document.close();
    printWindow.print();
  };
  const createNewFolder = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/create_folder`, { name: newFolderName })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(`Folder created successfully with id -> ${res.data.folder_id}`);
      })
      .catch((e) => {
        console.log(e);
        alert("error -", e);
      });
    console.log("Creating new folder");
  };
  const createNewFile = (e) => {
    e.preventDefault();
    console.log("the dagta is now......", selectedFolder, newFileName);
    axios
      .post(`http://localhost:5000/create_doc`, {
        folder_id: selectedFolder,
        name: newFileName,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        alert(`New File created successfully with id -> ${res.data.doc_id}`);
        window.location.href = "/doc/" + res.data.doc_id;
      })
      .catch((e) => {
        console.log(e);
        alert("error -", e);
      });
  };
  const handleFolderChange = (val) => {
    console.log("test");
    setSelectedFolder(val);
  };
  const handleMenu = (event) => {
    console.log(event);
    if (event.key === "version") {
      setShowVersion(!showVersion);
    }
  };
  return (
    <div>
      <DocumentMenuBar
        handleMenu={handleMenu}
        onNewFolder={showModal}
        onNewFile={showFileModal}
        onPrint={handlePrint}
      />

      {showVersion === true ? (
        <MyDiffComponent />
      ) : (
        <>
          <div
            className="sun-editor"
            id="menubar"
            style={{ background: "red", width: "100%" }}
          ></div>

          <Modal
            title="Create New Folder"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name..."
            />
            ;
          </Modal>

          <Modal
            title="Create New File"
            open={isFileModalOpen}
            onOk={handleFileOk}
            onCancel={handleFileCancel}
          >
            <Select
              value={selectedFolder}
              style={{ width: "100%" }}
              onChange={handleFolderChange}
              options={[
                {
                  value: "1NmcGu3XVYLHwNl6rRUDGqfma_8lqG7Kf",
                  label: "1NmcGu3XVYLHwNl6rRUDGqfma_8lqG7Kf",
                },
              ]}
            />
            <br />
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Enter file name..."
            />
            ;
          </Modal>
          <Row>
            <Col span={6}>col</Col>
            <Col span={12}>
              <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                setOptions={editorOptions}
                placeholder="Please type here..."
                autoFocus={true}
                lang="en"
                name="pd-editor"
                onSave={onsave}
                width="100%"
                height="85vh"
                id="pd-editor"
                // setContents={testData}
                // onImageUploadError={onImageUploadError}
                onChange={onChangeHandler}
              />
            </Col>
            <Col span={6}>col</Col>
          </Row>
        </>
      )}
    </div>
  );
};

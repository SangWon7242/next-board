"use client";

import MDEditor from "@uiw/react-md-editor";

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return <MDEditor.Markdown source={content} />;
}

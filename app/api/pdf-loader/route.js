import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

const pdfUrl =
  "https://graceful-mockingbird-189.convex.cloud/api/storage/6055f8ba-efa0-4dd9-acad-45ee54af34f9";
export async function GET(req) {
  // 1. Load the PDF file
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });
  //   2. Split the text into small chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);
  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });
  return NextResponse.json({ result: splitterList, status: "success" });
}

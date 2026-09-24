import JsBarcode from "jsbarcode";

export const receipt = {
  height: 480, // Very short, quick render
  seed: 42,
};

export function drawReceipt(p) {
  const { width: w } = p;
  const margin = 24;

  p.background(255);
  p.fill(0);
  p.noStroke();
  p.textFont("monospace");

  // 1. Minimal Header
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(22);
  p.text("CINEMA ROLL", w / 2, 28);

  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text("ADMIT ONE • TICKET #0042", w / 2, 58);

  line(p, margin, 80, w - margin);

  // 2. Quick Ticket Details
  p.textAlign(p.LEFT, p.TOP);
  p.textSize(10);
  p.text("EVENT : Midnight Screening", margin, 96);
  p.text("SEAT  : Row F, Seat 12", margin, 116);
  p.text("TIME  : 21:30 PM", margin, 136);

  line(p, margin, 158, w - margin);

  // 3. Simple Signature Area
  p.textStyle(p.BOLD);
  p.text("SIGNATURE:", margin, 174);

  // Lightweight drawn signature ("Deery")
  p.stroke(0);
  p.strokeWeight(1.8);
  p.noFill();

  // Monogram / strike
  p.line(margin + 20, 220, margin + 180, 220); // Strike line
  p.line(margin + 50, 195, margin + 45, 240);  // Stem 1
  p.line(margin + 65, 195, margin + 62, 238);  // Stem 2

  // Cursive loop
  p.beginShape();
  p.curveVertex(margin + 75, 220);
  p.curveVertex(margin + 80, 210);
  p.curveVertex(margin + 95, 210);
  p.curveVertex(margin + 110, 220);
  p.curveVertex(margin + 125, 235);
  p.curveVertex(margin + 140, 210);
  p.endShape();

  line(p, margin, 255, w - margin);

  // 4. Barcode Footer
  const code = "CINEMA-2026";
  drawBarcode(p, code, w / 2, 275);

  p.noStroke();
  p.fill(0);
  p.textAlign(p.CENTER, p.TOP);
  p.textSize(9);
  p.text(code, w / 2, 325);
  p.text("receipt.hackclub.com", w / 2, 345);
}

function line(p, x1, y, x2) {
  p.stroke(0);
  p.strokeWeight(1);
  p.line(x1, y, x2, y);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1.2,
    height: 38,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  p.drawingContext.drawImage(
    barcodeCanvas,
    Math.floor(centerX - barcodeCanvas.width / 2),
    y
  );
}

import * as JsPDF from 'jspdf';
import 'jspdf-autotable';

JsPDF.API.setFontHeading = function setFontHeading() {
  this.setFontStyle('bold');
  this.setFontSize(24);
};

const renderKlasse = (klasse, doc) => {
  doc.addPage();
  doc.setFontHeading();
  doc.text('Ergebnisse', 210 / 2, 30, { align: 'center' });
  doc.setFontStyle('normal');
  doc.text(`Klasse ${klasse.klasse.stufe}/${klasse.klasse.name}`, 210 / 2, 40, { align: 'center' });
  doc.autoTable({
    head: [['Vorname', 'Nachname', 'Punkte', 'Note']],
    body: klasse.schuelerAuswertung.map((schueler) => [
      schueler.schueler.vorname,
      schueler.schueler.nachname,
      schueler.punkte,
      schueler.note,
    ]),
    startY: 55,
  });
};

export default (data, von, bis) => {
  const doc = new JsPDF({
    // A4 = 210mm * 297mm
    format: 'a4',
  });
  doc.setFontHeading();
  doc.text('Auswertung Sportfest', 210 / 2, 30, { align: 'center' });
  doc.text(`${new Date().getFullYear()}`, 210 / 2, 40, { align: 'center' });

  doc.setFontStyle('normal');
  doc.setFontSize(18);
  doc.text(`Klassenstufen: ${von} - ${bis}`, 210 / 2, 70, { align: 'center' });

  data.forEach((klasse) => {
    // prüfen ob ergebnisse vorliegen
    if (klasse.durchschnitt) {
      renderKlasse(klasse, doc);
    }
  });

  doc.output('dataurlnewwindow');
};

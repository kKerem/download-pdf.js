// 1. pdfi aç
// 2. maksimum zooma ulaştırıp 3 kez zoomu uzaklaştır
// 3. yavaşça pdf sonuna kadar aşağı kaydır (tüm dokumanın yüklenebilmesi için)
// 4. Tarayıcının geliştirici açarak(veya direk F12) konsol kısmına bu kodu yapıştırıp çalıştır.

let jspdf = document.createElement("script");
jspdf.onload = function () {
    // [297 * 3.75, 210 * 3] [Width * Length]
    let pdf = new jsPDF('l', 'mm', [297 * 3.75, 210 * 3]);
    let elements = document.getElementsByTagName("img");
    for (let i in elements) {
        let img = elements[i];
        console.log("add img ", img);
        if (!/^blob:/.test(img.src)) {
            console.log("geçersiz URL");
            continue;
        }
        let can = document.createElement('canvas');
        let con = can.getContext("2d");
        can.width = img.width;
        can.height = img.height;
        con.drawImage(img, 0, 0, img.width, img.height);
        let imgData = can.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.addPage();
    }
    pdf.save("yeni_dosya.pdf");
};
jspdf.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js';
document.body.appendChild(jspdf);

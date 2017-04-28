$(document).ready(function() {
	$("#printPDF").on('click', function() {
		var docDefinition = { 
			content: [
			    // if you don't need styles, you can use a simple string to define a paragraph
			    'This is a standard paragraph, 是否支持中文呢？',
			    { text: 'This paragraph will have a bigger font', fontSize: 15 },
			    {
			      text: [
			        'This paragraph is defined as an array of elements to make it possible to ',
			        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
			        'than the rest.'
			      ]
			    }
			],
			defaultStyle: {
			    font: 'weiruanyahei'
		    } 
		};

		pdfMake.fonts = {
           	weiruanyahei: {
     	   	normal: 'msyh.ttf',
           	bold: 'msyh.ttf',
          	italics: 'msyh.ttf',
          	bolditalics: 'msyh.ttf'
    	   }
  		};

		pdfMake.createPdf(docDefinition).download();
		//pdfMake.createPdf(docDefinition).open();
		//pdfMake.createPdf(docDefinition).print();
	});
});
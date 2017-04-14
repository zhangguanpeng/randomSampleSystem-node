$(document).ready(function() {
	$("#printPDF").on('click', function() {
		var docDefinition = { 
			pageSize: 'A5',
			content: [
			    // if you don't need styles, you can use a simple string to define a paragraph
			    'This is a standard paragraph, 是否支持中文呢？',

			    // using a { text: '...' } object lets you set styling properties
			    { text: 'This paragraph will have a bigger font', fontSize: 15 },

			    // if you set the value of text to an array instead of a string, you'll be able
			    // to style any part individually
			    {
			      text: [
			        'This paragraph is defined as an array of elements to make it possible to ',
			        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
			        'than the rest.'
			      ]
			    }
			] 
		};

		/*$scope.generatePdf = function() {
		    // create the window before the callback
		    var win = window.open('', '_blank');
		    $http.post('/someUrl', data).then(function(response) {
			    // pass the "win" argument
			    pdfMake.createPdf(docDefinition).print({}, win);
		    });
		};*/
		//var win = window.open('', '_blank');
		pdfMake.createPdf(docDefinition).download();

		pdfMake.createPdf(docDefinition).open();

		//pdfMake.createPdf(docDefinition).print();
	});
});
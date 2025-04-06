$(document).ready(function() {
  $('.submit').click(function(e) {
    e.preventDefault();
    
    var date = $('#date').val();
    var n_cheque = $('#n_cheque').val();
    var destination = $('#destination').val();
    var credit = $('#credit').val();
    var credit_letter = $('#credit-letter').val();

    if (credit_letter.length > 60) {
      var lastSpaceIndex = credit_letter.substring(0, 60).lastIndexOf(" ");
      var firstPart = credit_letter.substring(0, lastSpaceIndex);
      var secondPart = credit_letter.substring(lastSpaceIndex + 1);
    } else {
      var firstPart = credit_letter;
      var secondPart = "";
    }

    var lieux = $('#lieux').val();
    var n_piece = $('#n_piece').val();
    var libelle = $('#libelle').val();
    var debit = $('#debit').val();
    var solde = $('#solde').val();

    // Generate the HTML for the check
    var checkHtml = '<div class="check">' +
      '<div class="check-header"></div>' +
      '<div class="check-body">' +
      '<div class="row">' +
      '<div class="col-md-6">' +
      '<p class="pdate date">' + date + '</p>' +
      '<p class="pdestination destination">' + destination + '</p>' +
      '<p class="pcredit credit">' + credit + '</p>' +
      '<p class="pcl credit-letter">' + firstPart + '</p>' +
      '<p class="pcl2 credit-letter2">' + secondPart + '</p>' +
      '</div>' +
      '<div class="col-md-6">' +
      '<p class="plieux">' + lieux + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

   // Create a new window to print the check
   var printWindow = window.open('', 'Print');
   printWindow.document.write('<html><head><title>Cheque</title>');
   printWindow.document.write($('style').prop('outerHTML'));
   printWindow.document.write('</head><body>');
   printWindow.document.write(checkHtml);
   printWindow.document.write('</body></html>');
   printWindow.document.close();

   // Print the check
   printWindow.print();

   // Close the print window and ask for confirmation after a delay
   setTimeout(function() {
     printWindow.close();
     
     var confirmPrint = confirm('Has the printing completed?');

     if (confirmPrint) {
       // Send form data using AJAX after printing is confirmed
       var formData = new FormData($('#myForm')[0]);

       $.ajax({
         url: 'insert_data.php',
         type: 'POST',
         data: formData,
         processData: false,
         contentType: false,
         success: function(response) {
           console.log(response);
         },
         error: function(xhr, status, error) {
           console.log(error);
         }
       });
     }
   }, 1000); // Adjust the delay time as needed
 });
});

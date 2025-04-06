$(function() {
      // Set the default language to Arabic
  const defaultLanguage = 'FR';
  $('#language').val(defaultLanguage);
$.getJSON('js/translations.json', function(translations) {
  $('[data-translate]').each(function() {
    const key = $(this).data('translate');
    // $(this).val(translations[defaultLanguage][key]);
    $(this).html(translations[defaultLanguage][key]);
    $(this).attr('placeholder', translations[defaultLanguage][key]);
  });

    
        $('#language').on('change', function() {
            const selectedLanguage = $(this).val();
            $('[data-translate]').each(function() {
                const key = $(this).data('translate');
                $(this).val(translations[selectedLanguage][key]);
                $(this).html(translations[selectedLanguage][key]);
                $(this).attr('placeholder', translations[selectedLanguage][key]);
            });
        });
    });
});

define('mdict-parseXml', function() {
  return function (str) {
        return (new DOMParser()).parseFromString(str, 'text/xml');
    }
});

require(['jquery', 'mdict-common', 'mdict-parser', 'mdict-renderer', 'selectize'], function($, MCommon, MParser, MRenderer, Selectize) {


  var $input = $('#dictfile').on('change', accept);
  
  function accept(e) {
    var fileList = $(e.target).prop('files');

    $('#btnLookup').attr('disabled', true);

    if (fileList.length > 0) {
        $('#btnLookup').addClass('stripes');
        $('#word').on('keyup', function(e) { e.which === 13 && $('#btnLookup').click(); });

        MParser(fileList).then(function(mdicts) {
            console.log("after_load: ");
            console.log("(1)resources len: ", mdicts.length, mdicts);
            console.log("(2)",mdicts[0]);
            console.log("(3)",mdicts[0].value());//是 f(query){  //if (typeof query === 'string' || query instanceof String) {
            console.log("(3)",mdicts[0].value()._num_entries);
            currentDict = mdicts[0].value();
            setListSize(mdicts[0].value()._num_entries);//原来还可以这样玩!
            //setCurrMdict(mdicts[0].value());

            //console.log("3",mdicts[1].value().description);
            //console.log(mdicts["mdd"]);
            //console.log(mdicts["mdx"].then(function(lookup){return lookup("happy")}));//真他妈有趣啊!
            //console.log(mdicts[0].then(function(lookup){return lookup("happy")}));//真他妈有趣啊!
            //console.log("!!!",mdicts[0].value()("happy"));//真他妈有趣啊!
            mdicts[0].value()("happy").then(function (definitions){
                console.log(definitions);
            });//真他妈有趣啊!

          var mdict = MRenderer(mdicts);

          function doSearch(phrase, offset) {
              console.log(phrase + '');
              mdict.lookup(phrase, offset).then(function($content) {
                $('#definition').empty().append($content.contents());
                console.log('--');
              });
          }
          
          
          //$('#dict-title').html((resources['mdx'] || resources['mdd']).value().description || '** no description **');
          mdict.render($('#dict-title'));
          
          $('#btnLookup')
            .attr('disabled', false)
            .off('.#mdict')
            .on('click.#mdict', function() {
              doSearch($('#word').val());
            }).click();

        });
    } else {
      $('#btnLookup').attr('disabled', false);
    }
    
    // jump to "entry://"
    // TODO: have to ignore in-page jump
    $('#definition').on('click', 'a', function(e) {
      var href = $(this).attr('href');
      if (href && href.substring(0, 8) === 'entry://') {
        var word = href.substring(8);
        // TODO: remove '#' to get jump target
        if (word.charAt(0) !== '#') {
          word = word.replace(/(^[/\\])|([/]$)/, '');

          $('#word').val(word);
          $('#btnLookup').click();
        } else {
          var currentUrl = location.href;
          location.href = word;
          history.replaceState(null,null,currentUrl);
        }
        return false;
      }
    });
  }


});

  


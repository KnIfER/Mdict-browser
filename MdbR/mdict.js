define('mdict-parseXml', function() {
  return function (str) {
        return (new DOMParser()).parseFromString(str, 'text/xml');
    }
});

require(['jquery', 'mdict-common', 'mdict-parser', 'mdict-renderer', 'selectize'], function($, MCommon, MParser, MRenderer, Selectize) {


  var $input = $('#dictfile').on('change', accept);

  $('#submitf').on('click', submitit);

  function accept(e) {
      console.log("fileList: ",document.getElementById('dictfile').files);
    var fileList = $(e.target).prop('files');
    if (fileList.length > 0)
        scanInFiles(fileList);
  }

    function  submitit(){
        var fileList =  document.getElementById('dictfile').files;//$($('#fileBtn')).prop('files');

        console.log("fileList: ",fileList);
        if (fileList.length > 0)
            scanInFiles(fileList);
    }


  function scanInFiles(fileList){
      MParser(fileList).then(function(mdicts) {
          console.log("after_load: ");
          console.log("(1)resources len: ", mdicts.length, mdicts);
          console.log("(2)",mdicts[0]);
          console.log("(3)",mdicts[0].value());//是 f(query){  //if (typeof query === 'string' || query instanceof String) {
          console.log("(3)",mdicts[0].value()._num_entries);
          if(currentDicts.length>0)
              currentDicts[lastDingX].OldPos = pos;
          lastDingX=currentDicts.length;
          setListSize(mdicts[0].value()._num_entries);//原来还可以这样玩!
          var base = currentDicts.length;
          var e = [];
          e.id=base;
          for(var i=0;i<mdicts.length;i++){
              currentDicts.push(mdicts[i]);
              var item = document.createElement('p');
              var itemi = document.createElement('span');
              itemi.style.setProperty("background-color","#4296FA");

              itemi.id=item.id = base+i;
              item.className="cp2";
              item.onclick=itemi.onclick = p2;
              itemi.innerText = mdicts[i].value().filename;

              item.style.setProperty("background-color","#4296FA");
              item.appendChild(itemi);
              dictsP.appendChild(item);
          }
          p2(e);




          //console.log("3",mdicts[1].value().description);
          //console.log(mdicts["mdd"]);
          //console.log(mdicts["mdx"].then(function(lookup){return lookup("happy")}));//世界真奇妙
          //console.log(mdicts[0].then(function(lookup){return lookup("happy")}));//世界真奇妙
          //console.log("!!!",mdicts[0].value()("happy"));//世界真奇妙
          //mdicts[0].value()("happy").then(function (definitions){
          //    console.log(definitions);
          //});//世界真奇妙//
      });
  }

    //scanInFiles([new File([],"NameOfPlants.mdx")]);

});

  


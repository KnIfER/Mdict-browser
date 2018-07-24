
onmessage =function (evt){
    console.log("::::");
    var d = evt.data;
    console.log("::::"+d);
    new FileReaderSync();
    var scanner = Scannermy(new FileReaderSync().readAsArrayBuffer(d));
    var list = Array(kdx.num_entries);
    scanner.forward(kdx.offset);
    scanner = scanner.readBlock(kdx.comp_size, kdx.decomp_size);

    for (var i = 0; i < kdx.num_entries; i++) {
        var offset = scanner.readNum();
        list[i] = new Object(scanner.readText());
        list[i].offset = offset;
        if (i > 0) {
            list[i - 1].size = offset - list[i - 1].offset;
        }
    }
    _cached_keys = {list: list, index: kdx.index, pilot:kdx.first_word};
    postMessage( list );//将获取到的数据发送会主线程
    console.log("::::");
}
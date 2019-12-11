var ajax = {

  //get请求方式
  get: function (url, isAsync, fn) {

    //url: 请求地址
    //isAsync: 是否异步
    //fn: 处理服务器响应的数据的回调函数

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

      if (this.readyState === 4 && this.status === 200) {
        fn(this.responseText);
      }

    }


    xhr.open('GET', url, isAsync);

    xhr.send(null);

  },

  ajaxGet: function (o) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

      if (this.readyState === 4 && this.status === 200) {
        o.success(this.responseText);
      }

    }


    xhr.open('GET', o.url, o.isAsync);

    xhr.send(null);

  }

};
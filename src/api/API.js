/**
 * Created by liorf on 11/26/16.
 */
import * as $ from 'jquery';
const host= '35.156.80.173';
const servicName = 'WebService1.asmx';


class Api {
  static postRequest (url, data, callBack) {
    // console.log("Api | postRequest");
    $.post({
      url: 'http://'+host +'/' + servicName + '/' + url,
      cache: false,
      // data: {any: data},
      data: data,
      dataType: 'json',
      // accept: 'application/json',
      // contentType: 'application/json',
      success: function(recData) {
        callBack(recData);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url);
        console.error(status);
        console.error(err);
        callBack();
      }.bind(this)
    });
  }
}


export default Api;

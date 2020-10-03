import nodeGeocoder from 'node-geocoder';

let options = {
    provider: 'openstreetmap'
  };
let geoCoder = nodeGeocoder(options);

class decode {

  static geoDecode(location) {
    geoCoder.geocode(location).then((res)=> {
      return res;
    }).catch((err)=> {
        return err;
    });  
  }

  static reverse(cordinate) {
    geoCoder.reverse({lat:38.66, lon:-78.43})
    .then((res)=> {
        return res;
    }).catch((err)=> {
        return err;
    });
}

}

export default decode;
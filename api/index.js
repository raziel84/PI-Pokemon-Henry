//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Tipo } = require("./src/db.js");
const { getTypes } = require("./src/controllers/Tipos-controller.js");

// Syncing all the models at once.
//Agregado async para poder comprobar si la tabla de tipos tiene datos antes de levantar el servidor
conn.sync({ force: false }).then(async () => {
  //Consulto si la tabla tipo tiene información
  const consulta = await Tipo.findAll();

  if (!consulta.length) {
    getTypes();
  }
  //------------OJO con force true---------
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});

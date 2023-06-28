/*
  このファイル内で定義されているselectは、prismaからデータを取得する際に、セキュリティ上の懸念のあるデータを取得しないようにするためのものです。

  例えば、以下のselectUserは、id, name, imageの項目のみを取得するように指定しています。
  これにより、emailやpasswordなどのセキュリティ上の懸念のあるデータを取得しないようにしています。
  const selectUser = {
    id: true,
    name: true,
    image: true,
  };
*/

export const selectUser = {
  id: true,
  name: true,
  image: true,
};

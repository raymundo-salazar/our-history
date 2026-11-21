# Códigos para crear los QR

El primer QR es el único que contiene una página. Debe apuntar a la URL HTTPS de producción de la aplicación:

```text
QR 00 · Bienvenida
https://TU-DOMINIO-DE-PRODUCCION/
```

Los siguientes seis QR no contienen URLs. Contienen exactamente estos códigos de texto:

| QR  | Capítulo         | Código que debe contener |
| --- | ---------------- | ------------------------ |
| 01  | Lavandería       | `nh-01-luna-azul`        |
| 02  | Cajuela          | `nh-02-brisa-cobre`      |
| 03  | Oficina y taller | `nh-03-norte-sutil`      |
| 04  | Horno            | `nh-04-ramos-tarde`      |
| 05  | Habitación       | `nh-05-casa-viva`        |
| 06  | Terraza          | `nh-06-ultimo-suspiro`   |

La aplicación valida el código contra la estación esperada. Un código de otra estación, un código inventado o un código ya utilizado no permite avanzar.

Al crear los QR, conserva exactamente mayúsculas, minúsculas, guiones y números. No agregues espacios ni una URL delante de los códigos 01–06.

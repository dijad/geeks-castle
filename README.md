# GeekCastle: Prueba técnica Backend!


Hola, muchas gracias por permitirme ser parte de este proceso. Agradezco mucho la comprensión que tuvieron con mi situación y la oportunidad que me brindan con poder entregar el desarrollo de la prueba técnica, la cual espero que este a la altura del equipo y genera buenas vibras para poder avanzar un paso más en el camino para ser parte del equipo de GeekCastle.

## Configuración

- Clonar el repositorio https://github.com/dijad/geeks-castle.
- Una vez clonado el proyecto(RAMA **master**), ejecutar el comando `npm i` en la raíz del proyecto para instalar las dependencias requeridas.
- Crear en la raiz del proyecto un archivo `.env`.
- En el archivo `.env` copiar el contenido adjunto en el documento con mismo nombre en el correo en que se envía la prueba.
- Ejecutar el comando `npm run start` para ejecutar el proyecto.

## Ejecución

- Desde un aplicativo como Postman o Insomnia, ejecutar el siguiente Curl
>POST /users/ HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 67
{
    "username": "Dijad", 
    "email":"ffffff@gmail.com"
}

En el **body** de la petición se puede agregar el campo **password** para verificar el correcto funcionamiento.

>Nota: Se adjuntaran evidencias visuales de la base de datos Firestore que demuestran el correcto almacenamiento de datos. 

## Pruebas

Para ejecutar las pruebas se debe ejecutar el comando `npm test`.
## Explicación de las Pruebas

1.  **should generate a password of the specified length**:
    
    -   Verifica que la función genera una contraseña con la longitud especificada.
    
2.  **should generate a password containing uppercase letters**:
    
    -   Verifica que la contraseña generada contiene al menos una letra mayúscula.
    
3.  **should generate a password containing lowercase letters**:
    
    -   Verifica que la contraseña generada contiene al menos una letra minúscula.
    
4.  **should generate a password containing numbers**:
    
    -   Verifica que la contraseña generada contiene al menos un número.
    
5.  **should generate a password containing special characters**:
    
    -   Verifica que la contraseña generada contiene al menos un carácter especial.
    
6.  **should generate unique passwords**:
    -   Verifica que la función genera contraseñas únicas en llamadas consecutivas.
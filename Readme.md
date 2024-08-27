### Instrucciones de ejecución

# Ejecución Frontend
link documento: https://docs.google.com/document/d/1qXVEqlJ_gnc0uN8Eb_QWU36R-7frHsi60W4WnOkCXIk/edit?usp=sharing

# Ejecución Backend
# 1. Crear y Activar un Entorno Virtual
Es una buena práctica usar un entorno virtual para gestionar las dependencias del proyecto.

Crear un entorno virtual:
bash
Copiar código
python -m venv venv
Activar el entorno virtual:

En Windows:
bash
Copiar código
venv\Scripts\activate

En macOS/Linux:
bash
Copiar código
source venv/bin/activate

# 2. Instalar las Dependencias
Las dependencias del proyecto deberían estar listadas en un archivo requirements.txt o Pipfile. Instálalas con el siguiente comando:

bash
Copiar código
pip install -r requirements.txt

# 3. Configurar Variables de Entorno
Revisar si hay un archivo .env.example en el proyecto que indique las variables de entorno necesarias. Si es así, cópialo a un archivo .env:

bash
Copiar código
cp .env.example .env
Editar el archivo .env para ajustar las variables a tu entorno local. Asegúrate de incluir valores adecuados para claves secretas, configuraciones de la base de datos, etc.

# 4. Aplicar Migraciones
Django utiliza migraciones para gestionar el esquema de la base de datos. Debes aplicar estas migraciones antes de ejecutar el servidor.

bash
Copiar código
python manage.py migrate

# 5. Ejecutar el Servidor de Desarrollo
Finalmente, puedes iniciar el servidor de desarrollo para ejecutar la API localmente:

bash
Copiar código
python manage.py runserver
El servidor debería estar corriendo en http://127.0.0.1:8000/ por defecto. Puedes verificar que la API está funcionando accediendo a las URLs que hayas definido en tu proyecto.

# 6. Probar la API
Puedes usar herramientas como Postman o curl para probar los endpoints de la API y asegurarte de que todo esté funcionando correctamente.
Errores de Dependencias: Si hay problemas con las dependencias, asegúrate de que todas estén instaladas correctamente y que requirements.txt esté actualizado.

Problemas de Variables de Entorno: Verifica que todas las variables necesarias están presentes y correctamente configuradas en el archivo .env.

Instrucciones para ejecutar el frontend:

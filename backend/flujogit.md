Propuesta de organizar el código en dos ramas principales:
    
    master: cualquier commit que pongamos en esta rama debe estar preparado para subir a producción

    devel: rama en la que está el código que conformará la siguiente versión planificada del proyecto


Cada vez que se incorpora código a **master**, tenemos una nueva versión.

Además de estas dos ramas, se proponen las siguientes ramas auxiliares:

    Ramas auxiliares:

    feature: Nuevas funcionalidades

    release: Versión pre-producción

    hotfix: Arreglos en producción

**==== Inicialización del repositorio ====**

Para inicializar un repositorio ejecutaremos los siguientes comandos:

<code>
git init

git commit --allow-empty -m "Initial commit"

git checkout -b devel master

git remote add origin https://server/namespace/project.git
</code>


**==== Nueva funcionalidad ====**

Los desarrollos de nuevas funcionalidades y bugfixes planificados se realizan sobre ramas **feature**
* Normalmente, estas ramas existen únicamente en los repositorios locales de cada desarrollador aunque, si la funcionalidad se desarrolla entre varias personas, la rama puede existir en el repositorio remoto.

* Se originan a partir de la rama devel.

* Se incorporan siempre a la rama devel y solo cuando se dan por terminadas.

* Las nombraremos **//feature/<issue_id>[-short_description]//**, donde **issue_id** es el identificador de la tarea en Redmine.

* Si el proyecto se gestiona con **Scrum**, solo se pueden incorporar a devel ramas de tareas asociadas al **Sprint actual**.

* El mensaje de un commit debe seguir el siguiente formato para que quede traza en Redmine y Gitlab: **refs #<issue_id> - <description>**

**Crear la rama a partir de devel**

<code>
git checkout -b feature/<issue_id>[-short_description] devel
</code>

**Compartir la rama (en caso necesario)**

<code>
git checkout feature/<issue_id>[-short_description]

git push origin feature/<issue_id>[-short_description]
</code>

**Finalizar una rama Feature**

<code>
git checkout devel

git pull origin devel

git merge --no-ff feature/<issue_id>[-short_description]

git branch -d feature/<issue_id>[-short_description]

git push origin devel

(if pushed) git push origin :feature/<issue_id>[-short_description]
</code>

:!: Es importante la opción **--no-ff** (ver cómo hacerlo con las diferentes herramientas con las que gestionamos el código) para que se genere un commit al hacer merge para documentar o dejar constancia que se hizo merge de otra rama.
:!: También es importante recordar eliminar la rama una vez que ha sido incorporada a //devel//, tanto en //local// como en //origin//.

**==== Release branches ====**

Cuando ha llegado la hora de lanzar una nueva release, se crea una rama **release/**.
El código de esta rama se despliega en un entorno de test adecuado, se prueba y cualquier problema se soluciona directamente en dicha rama. Este proceso > prueba > bugfix > prueba >... se repite hasta que el código sea lo suficientemente bueno como para lanzarlo a los clientes.
Cuando finaliza la versión, la rama //release// se fusiona con **//master//** y **//devel//**, para asegurarse de que cualquier cambio realizado no se pierda accidentalmente por un nuevo desarrollo.
* Se originan a partir de la rama devel.

* Se incorporan a master y devel una vez que el código está probado y listo para la siguiente versión.

* Las nombraremos **//release/x.y.z//**

* Se etiqueta la rama master con la nueva versión.

* El mensaje de un commit debe seguir el siguiente formato para que quede traza en Redmine y Gitlab: **refs #<issue_id> - <description>**

**Crear la rama a partir de devel**

<code>
git checkout -b release/x.y.z devel
</code>

**Compartir la rama (en caso necesario)**

<code>
git checkout release/x.y.z

git push origin release/x.y.z
</code>

**Finalizar una rama Release**

<code>
git checkout master

git pull origin master

git merge --no-ff release/x.y.z

git tag -a x.y.z

git checkout devel

git pull origin devel

git merge --no-ff release/x.y.z

git branch -d release/x.y.z

git push origin master

git push origin devel

git push origin --tags

git push origin :release/x.y.z (if pushed)
</code>

:!: Es importante la opción **--no-ff** (ver cómo hacerlo con las diferentes herramientas con las que gestionamos el código) para que se genere un commit al hacer merge para documentar o dejar constancia que se hizo merge de otra rama.
:!: También es importante recordar eliminar la rama una vez que ha sido incorporada a //devel// y //master//, tanto en //local// como en //origin//.

**==== Hotfixes ====**

Las ramas **//hotfix//** se utilizan para corregir fallos urgentes directamente del código de producción. Una vez corregido el código, los cambios son incorporados a las ramas //master// y //devel//:
* La creación de estas ramas no está planificada.

* Se originan a partir de la rama master.

* Se incorporan a la master y devel.

* Las nombraremos **//hotfix/<issue_id>[-short_description]//**, donde **issue_id** es el identificador de la tarea en Redmine (la tarea se clasifica como //bug//).

* En Redmine, se crea una versión no planificada y la tarea se asocia a dicha version.

* El mensaje de un commit debe seguir el siguiente formato para que quede traza en Redmine y Gitlab: **refs #<issue_id> - <description>**

**Crear la rama a partir de una versión de master**

<code>
git checkout -b hotfix/x.y.z [commit]
</code>

**Finalizar una rama Hotfix**

<code>
git checkout master

git pull origin master

git merge --no-ff hotfix/x.y.z

git tag -a x.y.z

git checkout devel

git pull origin devel

git merge --no-ff hotfix/x.y.z

git branch -d hotfix/x.y.z

git push origin master

git push origin devel

git push origin --tags

git push origin :hotfix/x.y.z (if pushed)
</code>
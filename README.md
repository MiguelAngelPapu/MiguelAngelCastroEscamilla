# Instalación y ejecución del proyecto

Guía completa de instalación y ejecución del proyecto **Angular 19 LTS** con su backend.

---

## 1. Requisitos

Antes de empezar, asegúrate de tener:

- Node.js **v20.19.5**
- npm (incluido con Node v20.19.5)
- Angular CLI **v19.2.15** (global)
- nvm (Node Version Manager) para gestionar la versión de Node

---

## 2. Configurar Node con nvm

macOS / Linux (bash, zsh):

```bash
# Instalar y usar la versión del proyecto
nvm install 20.19.5
nvm use 20.19.5

# Verificar versiones
node -v   # debe mostrar v20.19.5
npm -v
```

**Windows:** usa [nvm-windows](https://github.com/coreybutler/nvm-windows) y ejecuta:

```powershell
nvm install 20.19.5
nvm use 20.19.5
```

Guías rápidas:

- Linux: https://gndx.dev/blog/instalar-nvm-en-ubuntu-20-04/
- Mac: https://formulae.brew.sh/formula/nvm
- Video (Windows): https://www.youtube.com/watch?v=BWl0m1hL7u8
- Video (Mac/Linux): https://www.youtube.com/watch?v=X89QPv-zBAA

---

## 3. Instalar Angular CLI (global)

```bash
npm install -g @angular/cli@19.2.15
ng version
```

---

## 4. Instalación del Frontend

1. Descargar el archivo `.zip` del frontend (`MiguelAngelCastroEscamilla`).
2. Descomprimir en la carpeta deseada.
3. Abrir una terminal y navegar a la carpeta del proyecto.

**macOS / Linux (bash, zsh):**

```bash
cd ~/Descargas/MiguelAngelCastroEscamilla
```

**Windows (PowerShell):**

```powershell
cd 'C:\Users\TuUsuario\Downloads\MiguelAngelCastroEscamilla'
```

4. Instalar dependencias:

```bash
npm install
```

---

## 5. Ejecutar el Frontend

```bash
ng serve
```

Acceder en el navegador: [http://localhost:4200](http://localhost:4200)

Cambiar el puerto (opcional):

```bash
ng serve --port 4300
```

---

## 6. Ejecutar tests

Para ejecutar la suite de tests y ver los resultados en el navegador (Karma):

```bash
ng test --code-coverage
```

Para ejecutar los tests una única vez (sin modo watch) y generar el reporte de cobertura:

```bash
ng test --code-coverage --watch=false
```

El informe de cobertura se genera en la carpeta `coverage/` del proyecto; puedes abrir `coverage/index.html` para ver el detalle. Además, al ejecutar los tests (Karma) con `--code-coverage` verás un resumen de cobertura en la consola.

---

## 7. Configuración del Backend

1. Descargar el archivo `.zip` del backend (`repo-interview`).
2. Descomprimir en la carpeta deseada.
3. Abrir una terminal y navegar a la carpeta del backend.

**macOS / Linux (bash, zsh):**

```bash
cd ~/Descargas/repo-interview
```

**Windows (PowerShell):**

```powershell
cd 'C:\Users\TuUsuario\Downloads\repo-interview'
```

4. Instalar dependencias:

```bash
npm install
```

> Nota: Incluye `cors` para permitir consumo de la API desde el frontend.

---

## 8. Ejecutar el Backend

```bash
npm run start:dev
```

La API se servirá por defecto en: [http://localhost:3002](http://localhost:3002)

Si usas un puerto diferente, verifica la variable de entorno `PORT` antes de arrancar.

---

## 9. Notas finales

- Siempre usar la versión de Node indicada:

```bash
nvm use 20.19.5
```

- Angular CLI 19.2.15 es obligatoria para compatibilidad con componentes y librerías.
- Esta guía aplica para **Linux, Mac y Windows**.

Si tuviste algún problema con la instalación o al levantar los servicios, puedes escribirme al: **+57 3045641916**.

### Recomendación VS Code

- Abrir dos ventanas de VS Code: una para frontend y otra para backend.
- En cada terminal integrada:
  - Ejecutar `nvm use 20.19.5` (si aplica).
  - Instalar dependencias (`npm install`).
  - Levantar los servicios (`ng serve` para frontend y `npm run start:dev` para backend).

Esto permite ver logs independientes y controlar procesos sin mezclar terminales.
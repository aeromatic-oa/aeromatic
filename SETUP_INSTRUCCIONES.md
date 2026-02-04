# Configuración de Supabase para el Formulario de Contacto

## Pasos para configurar:

### 1. **Crear la tabla en Supabase**
- Ve a tu proyecto en [supabase.com](https://supabase.com)
- Ve a "SQL Editor"
- Copia y pega el contenido de `SUPABASE_SETUP.sql`
- Ejecuta el script

### 2. **Verificar variables de entorno**
Asegúrate de que en tu `.env.local` tienes:
```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 3. **Cambios realizados**

#### En `src/components/LandingPage.tsx`:
- ✅ Importado `supabase` del cliente
- ✅ Agregado estado para el formulario (`formData`, `isLoading`, `submitStatus`)
- ✅ Creada función `handleFormChange()` para actualizar el estado
- ✅ Creada función `handleFormSubmit()` que:
  - Valida que todos los campos estén completos
  - Inserta los datos en la tabla `contactos`
  - Muestra mensajes de éxito/error
  - Limpia el formulario después del envío exitoso
- ✅ Actualizado el formulario con:
  - Atributos `name` en los inputs
  - Binding de valores del estado
  - Manejador `onChange`
  - Manejador `onSubmit`
- ✅ Agregados iconos `CheckCircle` y `AlertCircle`
- ✅ Mostrado estado visual de carga en el botón "Enviar"
- ✅ Mostrados mensajes de éxito/error con animaciones

### 4. **Cómo funciona ahora**

1. **Usuario llena el formulario** → Los datos se guardan en el estado local
2. **Presiona "Enviar"** → Se validan los campos
3. **Se envían a Supabase** → Se insertan en la tabla `contactos`
4. **Se muestra un mensaje** → Verde si éxito, rojo si error
5. **El formulario se limpia** → Después de envío exitoso

### 5. **Ver los datos**

En Supabase, ve a:
- **Table Editor** → Selecciona tabla `contactos`
- Ahí verás todos los contactos que se han enviado

### 6. **Seguridad (RLS)**

La tabla tiene **Row Level Security habilitado** y permite:
- ✅ **INSERT**: Público (cualquiera puede enviar)
- ❌ **SELECT/DELETE**: No configurado (solo admin/backend)

Si quieres proteger la lectura, descomenta las políticas en el script SQL.

---

**¿Listo?** El formulario ahora está completamente funcional y conectado a Supabase. 🚀

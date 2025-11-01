# 📸 Instrucciones para Agregar las Fotos de los Novios

## 🎯 Ubicación de las Imágenes

Coloca las fotos de los novios en la siguiente carpeta:
```
src/assets/images/
```

## 📁 Nombres de Archivos Requeridos

**Opción 1: JPEG (Recomendado para fotos reales)**
1. **`novio1.jpeg`** - Foto del novio
2. **`novia1.jpeg`** - Foto de la novia

**Opción 2: PNG (Alternativa)**
1. **`novio1.png`** - Foto del novio
2. **`novia1.png`** - Foto de la novia

## 📋 Requisitos de las Imágenes

- **Formato**: JPEG o PNG
- **Tamaño recomendado**: 200x200 píxeles o mayor
- **Forma**: Preferiblemente cuadradas (se recortarán en círculo automáticamente)
- **Calidad**: Buena resolución para que se vean bien en la animación
- **Fondo**: Preferiblemente con fondo liso o que contraste bien con la cara

## 🔄 Pasos para Cambiar las Imágenes

### 1. Reemplazar archivos temporales
Las imágenes actuales son SVG de ejemplo. Para usar tus fotos:

1. Coloca tus archivos JPEG en `src/assets/images/`
2. Renómbralos exactamente como: `novio1.jpeg` y `novia1.jpeg`

### 2. Actualizar el código
Edita estos archivos para cambiar la extensión:

**En `src/app/components/floating-faces/floating-faces.component.ts`:**
```typescript
private imagePaths = [
  'assets/images/novio1.jpeg',  // Cambiar de .svg a .jpeg
  'assets/images/novia1.jpeg'   // Cambiar de .svg a .jpeg
];
```

**En `src/app/components/advanced-floating-faces/advanced-floating-faces.component.ts`:**
```typescript
private imagePaths = [
  'assets/images/novio1.jpeg',  // Cambiar de .svg a .jpeg
  'assets/images/novia1.jpeg'   // Cambiar de .svg a .jpeg
];
```

### 3. Reiniciar servidor
```bash
Ctrl + C  # Para parar el servidor
npm start -- --port 4201  # Para reiniciarlo
```

## 🎨 Tipos de Animación Disponibles

### 🎯 Animación Simple
- Movimiento de rebote suave
- 8 imágenes flotantes
- Opacidad baja para no distraer

### ✨ Animación Avanzada
- Múltiples tipos de movimiento (rebote, flotación, espiral)
- 12 imágenes con efectos diversos
- Filtros de color y efectos de pulso
- Interactividad al pasar el mouse

## 🛠️ Personalización Avanzada

### Cambiar número de imágenes
```typescript
const imageCount = 12; // Cambiar este número
```

### Ajustar opacidad
```typescript
opacity: 0.1 + Math.random() * 0.15, // Rango de 0.1 a 0.25
```

### Cambiar tamaño
```typescript
width: 60px; // En los estilos CSS
height: 60px;
```

### Velocidad de animación
```typescript
dx: (Math.random() - 0.5) * 1.5, // Velocidad horizontal
dy: (Math.random() - 0.5) * 1.5, // Velocidad vertical
```

## 🚀 Deploy con las Nuevas Imágenes

Cuando agregues tus fotos reales, recuerda recompilar para producción:

```bash
npm run build -- --base-href=/regalo-boda-spa/
npx angular-cli-ghpages --dir=dist/regalo-boda-spa/browser
```

## 🎨 Consejos para Mejores Resultados

1. **Fotos con buena iluminación**: Se verán mejor en la animación
2. **Caras centradas**: Para que el recorte circular funcione bien
3. **Expresiones alegres**: Acorde con el tema de boda
4. **Resolución alta**: Para mantener calidad al reducir tamaño
5. **Fondos simples**: Para mejor contraste

## 📱 Responsive

Las animaciones se adaptan automáticamente a diferentes tamaños de pantalla y se reposicionan cuando se redimensiona la ventana.
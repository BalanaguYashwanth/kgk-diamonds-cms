# **KGK CMS**

A modern, extensible Content Management System (CMS) built with Next.js, featuring a powerful plugin architecture that enables seamless core functionality extension and customization.

## **Key Features**
- 🔌 Flexible plugin system
- 🎨 Customizable UI components
- 🛣️ Dynamic route management and configuration
- 🏗️ Modular architecture supporting database schema extensions
- ⚡ Simple plugin development and integration workflow

## **System Architecture**

### Project Structure
```
/my-nextjs-app
|
├── prisma/
|     ├── migrations
|     └── schema.model
|
├── src/
│   ├── plugin-system/
│   │   ├── core/
│   │   │   ├── PluginStore.ts       # Central plugin management
│   │   │   ├── ComponentStore.ts    # UI component registry
│   │   │   └── RouteStore.ts        # Dynamic route handler
│   │   │
│   │   ├── plugins/
│   │   │   ├── video-embed/
│   │   │   │   ├── index.ts         # Plugin entry point
│   │   │   │   └── component.tsx     # Database schema
│   │   │   │
│   │   │   └── share-button/
│   │   │       ├── index.ts         # Plugin entry point
│   │   │       └── component.tsx      # Database schema
│   │   │
│   │   └── PluginSystem.ts          # Plugin system bootstrapper
│   │
│   └── app/                         # Next.js application
        ├── api/                     # API routes
        ├── posts/                   # Blog posts
        └── preview/                 # Content preview
```

## **Core Components**

### Plugin System Architecture

1. **Plugin Store (`PluginStore.ts`)**
   - Manages plugin registration
   - Handles plugin state

2. **Component Store (`ComponentStore.ts`)**
   - UI component registry
   - Dynamic component loading

3. **Route Store (`RouteStore.ts`)**
   - Route registration
   - Get routes

## **Getting Started**

### Prerequisites
- Node.js 18.x or higher
- Yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BalanaguYashwanth/kgk-diamonds-cms
cd kgk-cms
```

2. Install dependencies:
```bash
yarn install
```

3. Add .env

check reference from env.sample

```bash
DATABASE_URL= 'url'
```

3. Start development server:
```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the CMS.

## **Plugin Development Guide**

### Creating a New Plugin

1. **Create Plugin Directory**
```bash
mkdir src/plugins/my-plugin
```

2. **Implement Plugin Files**

- **Plugin Entry Point (`index.ts`):**
```javascript
import MyPluginComponent from './component';

export class MyPlugin {
   constructor(pluginSystem) {
    this.pluginSystem = pluginSystem;
  }

  boot() {
    this.pluginSystem.registerComponent({
      name: 'MyPluginComponent Name',
      component: MyPluginComponent,
    });
  }
}
```

- **Component Implementation (`component.tsx`):**
```javascript
import React from 'react';

const MyPluginComponent = ({ data }) => {
  return (
    <div className="my-plugin">
      {/* Component implementation */}
    </div>
  );
};

export default MyPluginComponent;
```

- **Database Schema (`model.prisma`):**
```prisma
model MyPluginData {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  data      Json?
}
```

### Plugin Registration

Register your plugin in the plugin system:

```javascript
// src/plugin-system/PluginSystem.ts
import { MyPlugin } from '@plugins/my-plugin';

PluginSystem.register(new MyPlugin());
```

### Using Plugins

Implement the plugin in your pages or components:

```javascript
import { usePlugin } from '@core/hooks';

const MyPage = () => {
  const { pluginSystem } = usePluginContext();
  const MyPluginComponent = pluginSystem.getComponent('MyPluginComponent');
  
  return (
    <div>
      <MyPluginComponent data={someData} />
    </div>
  );
};
```
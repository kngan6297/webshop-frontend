# E-Commerce Frontend

A modern React frontend for an e-commerce website built with Vite, TailwindCSS, and Zustand for state management.

## Features

- **Modern React**: Built with React 18 and Vite for fast development
- **Responsive Design**: Mobile-first design with TailwindCSS
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router for client-side navigation
- **Authentication**: JWT-based authentication with protected routes
- **UI Components**: Reusable components with Lucide React icons
- **Form Validation**: Client-side validation with error handling
- **API Integration**: Axios for HTTP requests with interceptors
- **Toast Notifications**: React Hot Toast for user feedback

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API calls
- **Lucide React**: Beautiful icons
- **React Hot Toast**: Toast notifications

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layouts/
│   │   └── DefaultLayout.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductListPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── categoryService.js
│   ├── stores/
│   │   ├── authStore.js
│   │   └── productStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see server README)

### Installation

1. **Install Dependencies**

   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**

   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Configuration

### Environment Variables

The frontend is configured to proxy API requests to the backend. The proxy is set up in `vite.config.js`:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

### TailwindCSS Configuration

The project includes a custom TailwindCSS configuration with:

- Custom color palette (primary, secondary)
- Custom font family (Inter)
- Custom component classes (buttons, inputs, cards)

## Pages

### Public Pages

- **Home**: Landing page with hero section and featured products
- **Product List**: Browse all products with filters and search
- **Product Detail**: Individual product page with images, reviews, and add to cart
- **Login**: User authentication
- **Register**: User registration

### Protected Pages

- **Admin Dashboard**: Admin-only dashboard with statistics and management tools

## Components

### Layout Components

- **DefaultLayout**: Main layout with header and footer
- **Header**: Navigation with search, user menu, and mobile responsiveness
- **Footer**: Site footer with links and company information

### UI Components

- **ProductCard**: Reusable product display component
- **ProtectedRoute**: Route wrapper for authentication and role-based access

## State Management

### Auth Store (`stores/authStore.js`)

- User authentication state
- Login/logout functionality
- Profile management
- Role-based access control

### Product Store (`stores/productStore.js`)

- Product listing and filtering
- Product search functionality
- Product ratings and reviews
- Pagination state

## API Integration

### Base API Configuration (`services/api.js`)

- Axios instance with base URL
- Request interceptors for authentication
- Response interceptors for error handling
- Automatic token management

### Service Modules

- **authService**: Authentication API calls
- **productService**: Product-related API calls
- **categoryService**: Category management API calls

## Styling

### TailwindCSS Classes

The project uses custom TailwindCSS classes defined in `index.css`:

```css
.btn {
  /* Button base styles */
}
.btn-primary {
  /* Primary button styles */
}
.btn-secondary {
  /* Secondary button styles */
}
.btn-outline {
  /* Outline button styles */
}
.input {
  /* Input field styles */
}
.card {
  /* Card component styles */
}
```

### Color Scheme

- **Primary**: Blue color palette for main actions
- **Secondary**: Gray color palette for secondary elements
- **Success**: Green for positive actions
- **Warning**: Yellow for warnings
- **Error**: Red for errors

## Features

### Authentication

- JWT-based authentication
- Protected routes
- Role-based access control (user/admin)
- Persistent login state
- Automatic token refresh

### Product Management

- Product listing with pagination
- Advanced filtering (category, price, search)
- Product search functionality
- Product ratings and reviews
- Featured products display

### User Experience

- Responsive design for all devices
- Loading states and error handling
- Toast notifications for user feedback
- Form validation with error messages
- Smooth transitions and animations

### Admin Features

- Admin dashboard with statistics
- User management interface
- Product management tools
- Quick action buttons

## Development

### Code Organization

- **Components**: Reusable UI components
- **Pages**: Route-level components
- **Services**: API integration layer
- **Stores**: State management
- **Layouts**: Page layout components

### Best Practices

- Component composition and reusability
- Proper error handling
- Loading states for better UX
- Form validation
- Responsive design
- Accessibility considerations

## Deployment

### Build Process

1. Run `npm run build` to create production build
2. The build output will be in the `dist` folder
3. Deploy the `dist` folder to your hosting service

### Environment Setup

- Ensure the backend API is running and accessible
- Update the proxy configuration in `vite.config.js` if needed
- Set up environment variables for production

## Contributing

1. Follow the existing code structure
2. Use consistent naming conventions
3. Add proper error handling
4. Include loading states
5. Test responsive design
6. Update documentation as needed

## License

MIT

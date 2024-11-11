# Betting Platform

A modern betting platform built with React, TypeScript, and Tailwind CSS, featuring real-time updates, secure authentication, and responsive design.

## Features

- 🔐 Secure authentication (Register/Login)
- 💰 Wallet management
- 🎲 Betting functionality
- 📊 Transaction history
- 📱 Fully responsive design
- 🎨 Modern UI with dark/light mode
- ⚡ Real-time updates
- 🔄 State-of-the-art state management

## Requirements

- Node.js 18.x or higher
- npm or yarn
- Modern web browser

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Zustand (State Management)
- React Query (Server State)
- React Hook Form + Zod (Forms & Validation)
- React Router (Navigation)
- i18n

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/natarafael/betting-plataform.git
cd betting-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
VITE_API_URL=http://your-api-url
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Testing the Application

1. Start the development server
2. Register a new account:
   ```
   Email: test@example.com
   Password: Test123!
   ```
3. Test the following features:
   - Registration and login
   - Viewing and placing bets
   - Checking transaction history
   - Wallet operations
   - Responsive design (mobile/desktop views)

## Security Considerations

- All financial transactions are validated server-side
- Sensitive data is never stored in local storage
- Authentication tokens are handled securely
- Form inputs are properly validated
- API requests are protected against CSRF

## Troubleshooting

### Common Issues

1. **API Connection Errors**

   - Verify API URL in .env file
   - Check if API server is running
   - Confirm network connectivity

2. **Build Errors**

   - Clear node_modules and reinstall dependencies
   - Verify Node.js version
   - Check for TypeScript errors

3. **Authentication Issues**
   - Clear browser storage
   - Check token expiration
   - Verify credentials

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Review the documentation
3. Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI Components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Powered by [React](https://react.dev)

## Contact

For any questions or concerns, please open an issue in the repository.

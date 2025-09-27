# Aegis SDK Integration - Deploy Account Example

This example app demonstrates how to integrate the Aegis SDK with **deploy account functionality only**.

## What's Implemented

✅ **AegisProvider Setup** - SDK is wrapped around the entire app  
✅ **Deploy Account Logic** - Create new Starknet wallets with gasless deployment  
✅ **Secure Storage** - Private keys are stored securely using Expo SecureStore  
✅ **Wallet Persistence** - Existing wallets are automatically loaded on app start  
✅ **Error Handling** - Proper error handling with user-friendly alerts  
✅ **Loading States** - Visual feedback during wallet deployment  

## Key Features

### 🔐 **Wallet Deployment**
- Creates new Starknet wallets using AVNU gasless deployment
- Generates secure private keys
- Automatically saves private keys to secure storage
- Shows wallet address after successful deployment

### 💾 **Secure Storage**
- Uses Expo SecureStore for private key storage
- Automatically loads existing wallets on app start
- No private keys stored in plain text

### 🎨 **User Experience**
- Clean, modern UI with dark theme
- Loading indicators during deployment
- Success/error alerts with detailed information
- Copy address functionality

## Setup Instructions

### 1. Install Dependencies
```bash
cd aegis-sdk-example
npm install
```

### 2. Get App ID (Required)
1. Visit https://aegis.cavos.xyz
2. Register your app to get a unique App ID
3. Replace `'example-app-id'` in `app/_layout.tsx` with your real App ID

### 3. Run the App
```bash
npm start
```

## How It Works

### 1. **App Initialization**
The `AegisProvider` wraps the entire app in `app/_layout.tsx`:
```typescript
<AegisProvider
  config={{
    network: 'SN_SEPOLIA',
    appName: 'Aegis SDK Example',
    appId: 'your-app-id', // Get from https://aegis.cavos.xyz
    enableLogging: true
  }}
>
```

### 2. **Wallet Deployment**
In `app/account.tsx`, the `handleDeployWallet` function:
```typescript
const handleDeployWallet = async () => {
  // Deploy new wallet
  const privateKey = await aegisAccount.deployAccount();
  
  // Save private key securely
  await SecureStore.setItemAsync('wallet_private_key', privateKey);
  
  // Update UI with new address
  setWalletAddress(aegisAccount.address);
};
```

### 3. **Wallet Persistence**
The app automatically loads existing wallets:
```typescript
const loadExistingWallet = async () => {
  const savedPrivateKey = await SecureStore.getItemAsync('wallet_private_key');
  if (savedPrivateKey && aegisAccount) {
    await aegisAccount.connectAccount(savedPrivateKey);
    setWalletAddress(aegisAccount.address);
  }
};
```

## File Structure

```
app/
├── _layout.tsx          # AegisProvider setup
├── index.tsx            # Welcome screen
├── account.tsx          # Wallet deployment logic
└── balance.tsx          # Balance screen (placeholder)
```

## Configuration Options

The AegisProvider accepts these configuration options:

```typescript
{
  network: 'SN_SEPOLIA',        // Starknet network
  appName: 'Aegis SDK Example',  // Your app name
  appId: 'your-app-id',         // Required: Get from https://aegis.cavos.xyz
  enableLogging: true           // Enable debug logs
}
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Private Key Storage**: Private keys are stored securely using Expo SecureStore
2. **No Network Transmission**: Private keys never leave the device
3. **User Responsibility**: Users should backup their private keys externally
4. **App ID Required**: You must get a real App ID from https://aegis.cavos.xyz

## Testing

### Test Wallet Deployment
1. Open the app
2. Tap "Connect" on the welcome screen
3. Tap "Deploy Wallet" on the account screen
4. Wait for deployment to complete
5. Verify the wallet address is displayed
6. Restart the app to test wallet persistence

### Expected Behavior
- ✅ Wallet deploys successfully
- ✅ Address is displayed correctly
- ✅ Private key is saved securely
- ✅ Wallet persists across app restarts
- ✅ Error handling works for network issues

## Next Steps

This example focuses only on wallet deployment. You can extend it by adding:

- **Transaction Execution** - Send transactions using `aegisAccount.execute()`
- **Balance Queries** - Check ETH/token balances
- **Social Login** - Add OAuth (Apple/Google) authentication
- **Email/Password Auth** - Add traditional authentication

## Troubleshooting

### Common Issues

1. **"Aegis SDK not initialized"**
   - Make sure AegisProvider wraps your app
   - Check that the SDK is properly imported

2. **Deployment fails**
   - Verify your App ID is correct
   - Check network connection
   - Ensure you're using SN_SEPOLIA for testing

3. **Wallet not persisting**
   - Check that expo-secure-store is installed
   - Verify SecureStore permissions on device

## Support

- **Documentation**: https://docs.cavos.xyz
- **App ID Registration**: https://aegis.cavos.xyz
- **Discord Community**: https://discord.gg/Vvq2ekEV47
# DreamScape AddressBook App (React Native — TypeScript)

## Overview
This project implements an address book with Login, Address Book, Favourites, and Profile screens. It uses Redux Toolkit for state management, redux-persist to persist favourites in AsyncStorage, Axios for API requests, and React Navigation for navigation.

## Key Decisions
- **Redux Toolkit**: central store for auth and contacts; favourites stored in contacts slice as a map for O(1) lookups and persisted.
- **Axios**: central instance with interceptor to attach token to protected calls.
- **HOC (`withAuth`)**: lightweight route guard to redirect unauthenticated users to Login.
- **Hooks**: `useAuth` and `useContacts` encapsulate API logic and expose simple methods to components.
- **UI**: responsive card-based layout; `Dimensions` used in the card for adaptive width.
- **Performance**: FlatList props such as `initialNumToRender`, `windowSize`, `getItemLayout`, and `removeClippedSubviews` used to improve rendering for large datasets.

## Trade-offs
- Mock endpoints may need adjustment for your backend contract.
- This demo persists favourites but not the entire contacts list to reduce persisted payload.
- For very large datasets (10k+ contacts) switch to server-side pagination or use a local DB (SQLite / WatermelonDB) and indexing.

## Next steps for production
- Add input validation and error messages on login.
- Add Sentry/monitoring and analytics.
- Use background sync or queued offline actions for offline writes.
- Improve accessibility and add automated tests (Jest + React Native Testing Library).

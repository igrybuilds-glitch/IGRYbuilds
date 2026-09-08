# Security Specification & Test Payloads (ABAC & Zero-Trust)

## 1. Data Invariants
1. `users/{userId}`: Document ID must match `request.auth.uid`. Email must match `request.auth.token.email`. Only the document owner or verified admin can read/write.
2. `briefs/{briefId}`: The `userId` field must match `request.auth.uid`. A user can only create a brief with their own `userId`. A user can read or list their own briefs (`resource.data.userId == request.auth.uid`).
3. Admin access is verified via `isAdmin()` checking the runtime admin email or `/admins/{uid}` document.
4. Timestamps (`createdAt`, `updatedAt`) must strictly use `request.time`.
5. Strict string length limits and regex checks are enforced on all fields.

## 2. The Dirty Dozen Payloads (Designed to Fail)
1. User profile creation with mismatched UID in path vs auth.
2. User profile update attempting to modify `createdAt` or change `userId`.
3. Brief creation with a spoofed `userId` belonging to another user.
4. Brief creation without required fields (missing `serviceType` or `description`).
5. Brief creation with oversized payload (> 2000 chars description).
6. Non-owner attempting to read private user profile or PII.
7. Non-owner attempting to list another user's briefs.
8. Unauthenticated user attempting to write or read documents.
9. Modifying a brief without updating `updatedAt == request.time`.
10. Injecting malformed document ID with special characters or path traversal.
11. Attempting to modify immutable `id` field during update.
12. Attempting to self-assign admin roles or permissions without validation.

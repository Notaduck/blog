# Proposed Maintenance Tasks

## Typo Fix
- **Issue**: README typos such as "tailcss", "nay", and "highligting" reduce professionalism and clarity. (See `README.md` lines 3-4, 9.)
- **Task**: Correct the spelling errors (e.g., "tailcss" → "TailwindCSS", "nay" → "any", "highligting" → "highlighting") and proofread the README introduction for similar mistakes.

## Bug Fix
- **Issue**: `Layout` component computes `isIndexPage` with `location.pathname !== "/"`, so the flag is `false` on the home page and `true` everywhere else, which reverses the conditional layout styling. (See `src/components/layout.tsx` lines 16-43.)
- **Task**: Update the logic so `isIndexPage` is `true` on the root path (e.g., `setIsIndexPage(location.pathname === "/")`) and ensure the conditional rendering still works as intended.

## Comment/Documentation Discrepancy
- **Issue**: `themeToggle.tsx` begins with a comment referencing `ThemeToggle.js`, but the file is TypeScript/TSX. (See `src/components/themeToggle/themeToggle.tsx` line 1.)
- **Task**: Update the comment (or remove it if redundant) so it correctly reflects the file name or provide a more helpful description of the component.

## Test Improvement
- **Issue**: The `test` npm script intentionally fails with a placeholder message, leaving the project without automated regression coverage. (See `package.json` line 94.)
- **Task**: Replace the placeholder script with a working test runner (e.g., Jest with React Testing Library) and add targeted tests—such as verifying `NavBar` contact button behavior—to cover critical UI interactions.

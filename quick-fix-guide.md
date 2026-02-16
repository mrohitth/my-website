## Quick Fix Guide - Tab Switching Issue

### THE PROBLEM 🐛

When using array indices as React keys, switching tabs causes:
- Wrong content showing in cards
- Glitchy animations  
- State confusion

**Why?** Both tabs use indices 0, 1, 2... React can't tell them apart!

```typescript
// ❌ BROKEN CODE
.map((project, index) => (
  <Card key={index}>  {/* BAD: Reuses 0, 1, 2 across tabs */}
```

### THE FIX ✅

Use unique project identifiers instead:

```typescript
// ✅ FIXED CODE  
.map((project) => (
  <Card key={project.title}>  {/* GOOD: Each project has unique title */}
```

### COPY-PASTE FIX

Find this line in BOTH tabs (ML and CV):
```typescript
.map((project, index) => (
```

Replace with:
```typescript
.map((project) => (
```

Then update ALL occurrences of:
- `key={index}` → `key={project.title}`
- `data-testid={...${index}...}` → `data-testid={...${project.title.toLowerCase().replace(/\s+/g, '-')}...}`

### TEST IT

1. Click "Deep Learning & Machine Learning Projects" tab
2. Click "Computer Vision Projects" tab
3. Switch back and forth multiple times
4. ✅ Should be smooth with no flickering or wrong content

### BONUS: Even Smoother Animations

Add this to your CSS/Tailwind config:

```css
/* Add fade-in animation */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
```

Then add to your tab containers:
```typescript
<div className="grid ... animate-fadeIn" data-testid="ml-projects-container">
```

---

**Key Takeaway:** Never use array indices as React keys when the array can change! Use unique identifiers like IDs, titles, or URLs instead.

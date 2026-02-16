# Tab Switching Fix for Academic Projects Section

## Issues Identified

### 1. **React Key Prop Issue** (Critical)
- **Problem**: Using `index` from `.map()` as the `key` prop
- **Why it's bad**: When you switch tabs, React sees different filtered arrays with the same indices (0, 1, 2...). This causes React to reuse DOM elements incorrectly, leading to:
  - Wrong content in cards
  - Animation glitches
  - State persistence issues
  - Incorrect event handlers

### 2. **Data-testid Conflicts**
- **Problem**: `data-testid={project-card-${index}}`uses the same index across different tabs
- **Impact**: Makes testing unreliable and debugging harder

## The Solution

Replace the array `index` with unique identifiers based on project titles:

### Before (❌ Broken):
```typescript
{projects.filter(project => !project.featured && project.category === "ml")
  .map((project, index) => (
    <Card key={index} data-testid={`project-card-${index}`}>
      {/* ... */}
    </Card>
  ))}
```

### After (✅ Fixed):
```typescript
{projects.filter(project => !project.featured && project.category === "ml")
  .map((project) => (
    <Card 
      key={project.title} 
      data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* ... */}
    </Card>
  ))}
```

## Complete Fixed Code

Replace your entire "Academic Research & ML Projects" section with this:

```typescript
{/* Academic Research & ML Projects */}
<div className="mb-8">
  <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
    📚 Academic Research & ML Projects
  </h3>
  
  {/* Tabs for Academic Projects */}
  <div className="mb-6 border-b border-portfolio-border/30">
    <div className="flex space-x-8">
      <button 
        className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
          activeTab === 'ml' 
            ? 'border-portfolio-primary text-portfolio-foreground' 
            : 'border-transparent text-portfolio-muted-foreground'
        }`}
        onClick={() => setActiveTab('ml')}
        data-testid="tab-ml"
      >
        Deep Learning & Machine Learning Projects
      </button>
      <button 
        className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
          activeTab === 'cv' 
            ? 'border-portfolio-primary text-portfolio-foreground' 
            : 'border-transparent text-portfolio-muted-foreground'
        }`}
        onClick={() => setActiveTab('cv')}
        data-testid="tab-cv"
      >
        Computer Vision Projects
      </button>
    </div>
  </div>

  {/* ML Projects Tab */}
  {activeTab === 'ml' && (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="ml-projects-container">
      {projects.filter(project => !project.featured && project.category === "ml")
        .map((project) => (
          <Card 
            key={project.title} 
            className="fade-in bg-portfolio-card border-portfolio-border overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group" 
            data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-48 object-cover"
              data-testid={`project-image-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.title}
              </h3>
              <p className="text-portfolio-muted-foreground mb-4" data-testid={`project-description-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
                    data-testid={`project-tech-${project.title.toLowerCase().replace(/\s+/g, '-')}-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a 
                  href={project.github} 
                  className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                  data-testid={`project-github-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Project
                </a>
                <a 
                  href={project.demo} 
                  className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                  data-testid={`project-demo-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
  )}

  {/* Computer Vision Projects Tab */}
  {activeTab === 'cv' && (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="cv-projects-container">
      {projects.filter(project => !project.featured && project.category === "Computer Vision")
        .map((project) => (
          <Card 
            key={project.title} 
            className="fade-in bg-portfolio-card border-portfolio-border overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group" 
            data-testid={`project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-48 object-cover"
              data-testid={`project-image-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.title}
              </h3>
              <p className="text-portfolio-muted-foreground mb-4" data-testid={`project-description-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
                    data-testid={`project-tech-${project.title.toLowerCase().replace(/\s+/g, '-')}-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a 
                  href={project.github} 
                  className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                  data-testid={`project-github-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Project
                </a>
                <a 
                  href={project.demo} 
                  className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                  data-testid={`project-demo-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
  )}
</div>
```

## What Changed?

### 1. **Unique Keys**
- ❌ Before: `key={index}`
- ✅ After: `key={project.title}`

### 2. **Stable Data-testids**
- ❌ Before: `data-testid="project-card-${index}"`
- ✅ After: `data-testid="project-card-${project.title.toLowerCase().replace(/\s+/g, '-')}"`

### 3. **Added Container Test IDs**
- Added `data-testid="ml-projects-container"` and `data-testid="cv-projects-container"` for better testing

### 4. **Added Tab Test IDs**
- Added `data-testid="tab-ml"` and `data-testid="tab-cv"` for the tab buttons

## Why This Works

1. **Unique Keys**: Project titles are unique, so React can properly track which components to update
2. **Consistent IDs**: Test IDs are now based on project names, not array positions
3. **Smooth Transitions**: React correctly unmounts/mounts components when switching tabs
4. **Better Performance**: React's diffing algorithm works optimally with stable keys

## Testing the Fix

After applying this fix, you should see:
- ✅ Smooth tab switching with no flickering
- ✅ Correct content displayed in each tab
- ✅ Proper animations when switching
- ✅ No console warnings about keys

## Optional Enhancement: Add Transitions

For even smoother transitions, you could add:

```typescript
{activeTab === 'ml' && (
  <div 
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn" 
    data-testid="ml-projects-container"
  >
    {/* ... */}
  </div>
)}
```

And add this CSS:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
```

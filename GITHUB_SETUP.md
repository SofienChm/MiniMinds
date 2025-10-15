# GitHub Setup Guide

This guide will help you add this project to GitHub.

## Prerequisites

1. **Install Git** (if not already installed)
   - Download from: https://git-scm.com/download/win
   - Run the installer with default settings
   - Restart your terminal/VS Code after installation

2. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for a free account

## Step-by-Step Instructions

### 1. Initialize Git Repository

Open PowerShell or your terminal in VS Code and run:

```powershell
# Navigate to your project directory
Set-Location "c:\laragon\www\daycare"

# Initialize Git repository
git init

# Configure your Git identity (replace with your info)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Daycare Management System"
```

### 2. Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Configure your repository:
   - **Repository name**: `daycare-management-system` (or your choice)
   - **Description**: "A comprehensive daycare admin panel for managing children, parents, daily activities, and attendance tracking"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize this repository with a README" (you already have one)
5. Click **"Create repository"**

### 3. Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Copy your repository URL and run:

```powershell
# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Verify the remote was added
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### 4. Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md will be displayed on the repository homepage

## Important Security Notes

✅ **Already Protected:**
- `.gitignore` file has been created to exclude:
  - `node_modules/` (Angular dependencies)
  - `bin/` and `obj/` (.NET build files)
  - `.angular/` (Angular cache)
  - `appsettings.Development.json` (sensitive config)
  - Database files
  - IDE files

✅ **Configuration Files:**
- `appsettings.json` has been sanitized with placeholder values
- `appsettings.example.json` has been created as a template
- **Remember**: Never commit real passwords or API keys!

## Future Git Commands

### Daily Workflow

```powershell
# Check status of your files
git status

# Add specific files
git add path/to/file

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Creating Branches

```powershell
# Create and switch to a new branch
git checkout -b feature/new-feature

# Push branch to GitHub
git push -u origin feature/new-feature

# Switch back to main
git checkout main

# Merge branch
git merge feature/new-feature
```

## Troubleshooting

### Git not recognized
- Make sure Git is installed
- Restart your terminal/VS Code
- Check if Git is in your PATH: `git --version`

### Authentication Issues
- GitHub may require a Personal Access Token (PAT) instead of password
- Go to: GitHub Settings → Developer settings → Personal access tokens
- Generate a new token with `repo` scope
- Use the token as your password when pushing

### Large Files
- If you have large files (>100MB), consider using Git LFS
- Or add them to `.gitignore`

## Next Steps

1. Add a LICENSE file (MIT, Apache, etc.)
2. Add badges to README (build status, license, etc.)
3. Set up GitHub Actions for CI/CD
4. Enable GitHub Issues for bug tracking
5. Add CONTRIBUTING.md for collaboration guidelines

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
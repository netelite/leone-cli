# 🦁 LEONE CLI — GitHub Deployment Guide

Complete guide for pushing LEONE CLI to GitHub and publishing to NPM.

---

## 📋 Pre-Flight Checklist

Before deploying, ensure you have:

- [ ] GitHub account (you have: @netelite)
- [ ] Repository created: https://github.com/netelite/leone-cli
- [ ] Git installed on your computer
- [ ] Node.js >= 14.0.0 installed
- [ ] npm account (for publishing later)

---

## 🚀 Step 1: Push to GitHub

### 1.1 Navigate to CLI Directory

```bash
cd C:\Users\PC\desktop\projekat-9\leone-cli
```

### 1.2 Initialize Git (if not already done)

```bash
git init
```

### 1.3 Add All Files

```bash
git add .
```

### 1.4 Create First Commit

```bash
git commit -m "Initial commit - LEONE CLI v1.0.0"

Features:
- CLI tool for installing LEONE methodology
- 14 methodology files (CC BY-NC-ND 4.0)
- CLI code (MIT License)
- Full AI governance system
- Dual licensing (MIT + CC BY-NC-ND 4.0)

Repository: https://github.com/netelite/leone-cli"
```

### 1.5 Rename Branch to Main

```bash
git branch -M main
```

### 1.6 Add Remote Repository

```bash
git remote add origin https://github.com/netelite/leone-cli.git
```

### 1.7 Push to GitHub

```bash
git push -u origin main
```

---

## ✅ Step 2: Verify on GitHub

1. Go to: https://github.com/netelite/leone-cli
2. Check that all files are uploaded:
   - ✅ index.js
   - ✅ package.json
   - ✅ README.md
   - ✅ LICENSE-CODE
   - ✅ LICENSE-METHODOLOGY
   - ✅ .gitignore
   - ✅ .leone-source/ (folder with all methodology files)
   - ✅ plans/ (folder with templates)

---

## 📦 Step 3: Test NPM Package Locally

Before publishing to NPM, test locally:

### 3.1 Create Test Package

```bash
cd C:\Users\PC\desktop\projekat-9\leone-cli
npm pack
```

This creates `leone-cli-1.0.0.tgz` — test what will be published.

### 3.2 Install Locally

```bash
npm install -g ./leone-cli-1.0.0.tgz
```

### 3.3 Test Commands

```bash
leone version
leone help
leone about
```

### 3.4 Test Init

```bash
mkdir test-leone
cd test-leone
leone init
```

Check that `.leone/` folder is created with all files.

---

## 📤 Step 4: Publish to NPM

### 4.1 Login to NPM (First Time Only)

```bash
npm login
```

Enter your npm credentials.

### 4.2 Publish

```bash
cd C:\Users\PC\desktop\projekat-9\leone-cli
npm publish
```

### 4.3 Verify Publication

```bash
npm view leone-cli
```

Or visit: https://www.npmjs.com/package/leone-cli

---

## 🌍 Step 5: Install from NPM (Test)

### 5.1 Install Globally

```bash
npm install -g leone-cli
```

### 5.2 Test

```bash
leone version
leone init
```

---

## 📝 Step 6: Update GitHub Description

Go to https://github.com/netelite/leone-cli and add:

### Repository Description:
```
🦁 LEONE AI Governance Methodology CLI — Lead your AI with confidence

Install: npm install -g leone-cli
Docs: https://www.npmjs.com/package/leone-cli
```

### Add Topics (Tags):
```
ai, ai-governance, cli, methodology, netelite, leone, developer-tools
```

---

## 🛡️ License Summary

### What's Protected:

| Component | License | What It Means |
|-----------|---------|---------------|
| **CLI Code** | MIT | Open source, must credit you |
| **Methodology** | CC BY-NC-ND 4.0 | Cannot sell, modify, or redistribute without permission |
| **LEONE Name** | Trademark | Your brand, protected |
| **Copyright** | © 2026 NETELITE | You own everything |

### Commercial Use:

If someone wants to use LEONE commercially (training, consulting, products):
- They must contact you: [YOUR_EMAIL]
- You can grant commercial license
- You control how LEONE is used commercially

---

## 🎯 Next Steps After Deployment

### 1. Share with Your Team

```bash
# Tell your team:
npm install -g leone-cli
leone init
```

### 2. Add to Your Projects

```bash
cd your-new-project
leone init
```

### 3. Monitor Usage

- Check npm downloads: https://www.npmjs.com/package/leone-cli
- Check GitHub stars: https://github.com/netelite/leone-cli/stargazers
- Check issues: https://github.com/netelite/leone-cli/issues

---

## 📞 Support & Contact

### For Users:
- **Issues:** https://github.com/netelite/leone-cli/issues
- **NPM Page:** https://www.npmjs.com/package/leone-cli
- **GitHub:** https://github.com/netelite/leone-cli

### For Commercial Inquiries:
- **Email:** [YOUR_EMAIL]
- **Website:** [YOUR_WEBSITE]

---

## 🦁 Success Checklist

After completing this guide, you should have:

- [x] Code pushed to GitHub
- [x] All files visible on GitHub
- [x] Local npm install works
- [x] `leone init` creates `.leone/` folder
- [x] Package published to NPM (optional)
- [x] Team can install with `npm install -g leone-cli`
- [x] Licenses protect your methodology

---

## 🎉 Congratulations!

You've successfully deployed LEONE CLI to GitHub and NPM!

**Your AI Governance Methodology is now:**
- ✅ Protected (dual licensing)
- ✅ Accessible (npm install -g leone-cli)
- ✅ Professional (GitHub + NPM presence)
- ✅ Ready for your team to use

**Lead your AI with confidence!** 🦁

---

**Version:** 1.0.0
**Repository:** https://github.com/netelite/leone-cli
**NPM:** https://www.npmjs.com/package/leone-cli

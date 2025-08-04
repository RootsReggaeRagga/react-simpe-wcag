const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building React app for WordPress plugin...');

// 1. Build React app
console.log('📦 Building React app...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ React app built successfully');
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}

// 2. Read build files
const buildDir = path.join(__dirname, 'build');
const pluginDir = path.join(__dirname, 'react-simple-wcag-wordpress-v2');

// Find the main JS file
const jsDir = path.join(buildDir, 'static', 'js');
const jsFiles = fs.readdirSync(jsDir);
const mainJsFile = jsFiles.find(file => file.startsWith('main.') && file.endsWith('.js'));
const chunkJsFile = jsFiles.find(file => file.startsWith('453.') && file.endsWith('.js'));

if (!mainJsFile) {
    console.error('❌ Main JS file not found');
    process.exit(1);
}

// Find the main CSS file
const cssDir = path.join(buildDir, 'static', 'css');
const cssFiles = fs.readdirSync(cssDir);
const mainCssFile = cssFiles.find(file => file.startsWith('main.') && file.endsWith('.css'));

if (!mainCssFile) {
    console.error('❌ Main CSS file not found');
    process.exit(1);
}

console.log(`📄 Found files:`);
console.log(`   JS: ${mainJsFile}`);
console.log(`   Chunk: ${chunkJsFile}`);
console.log(`   CSS: ${mainCssFile}`);

// 3. Copy build to plugin directory
console.log('📋 Copying build files to plugin directory...');
try {
    // Remove old build directory
    if (fs.existsSync(path.join(pluginDir, 'build'))) {
        fs.rmSync(path.join(pluginDir, 'build'), { recursive: true });
    }
    
    // Copy new build
    execSync(`cp -r ${buildDir} ${pluginDir}/`, { stdio: 'inherit' });
    console.log('✅ Build files copied');
} catch (error) {
    console.error('❌ Failed to copy build files:', error.message);
    process.exit(1);
}

// 4. Update PHP file with new file names
console.log('🔧 Updating PHP file with new file names...');
const phpFile = path.join(pluginDir, 'react-simple-wcag-wordpress.php');

try {
    let phpContent = fs.readFileSync(phpFile, 'utf8');
    
    // Update JS file name
    phpContent = phpContent.replace(
        /build\/static\/js\/main\.[a-zA-Z0-9]+\.js/g,
        `build/static/js/${mainJsFile}`
    );
    
    // Update CSS file name
    phpContent = phpContent.replace(
        /build\/static\/css\/main\.[a-zA-Z0-9]+\.css/g,
        `build/static/css/${mainCssFile}`
    );
    
    // Update root element ID in CSS styles
    phpContent = phpContent.replace(
        /#root/g,
        '#wcag-widget-root'
    );
    
    fs.writeFileSync(phpFile, phpContent);
    console.log('✅ PHP file updated');
} catch (error) {
    console.error('❌ Failed to update PHP file:', error.message);
    process.exit(1);
}

// 5. Create new ZIP file
console.log('📦 Creating new ZIP file...');
try {
    const zipName = 'react-simple-wcag-wordpress-v2.zip';
    if (fs.existsSync(zipName)) {
        fs.unlinkSync(zipName);
    }
    
    execSync(`zip -r ${zipName} react-simple-wcag-wordpress-v2/`, { stdio: 'inherit' });
    
    // Get file size
    const stats = fs.statSync(zipName);
    const fileSizeInKB = Math.round(stats.size / 1024);
    
    console.log(`✅ ZIP file created: ${zipName} (${fileSizeInKB} KB)`);
} catch (error) {
    console.error('❌ Failed to create ZIP file:', error.message);
    process.exit(1);
}

console.log('🎉 Plugin build completed successfully!');
console.log('📁 Files updated:');
console.log(`   - ${mainJsFile}`);
console.log(`   - ${mainCssFile}`);
console.log(`   - react-simple-wcag-wordpress-v2.zip`); 
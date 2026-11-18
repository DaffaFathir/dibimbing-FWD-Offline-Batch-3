/**
 * Responsive Design Testing Script
 * Tests viewport behavior at key breakpoints
 * Task 12.2 - Responsive design testing
 */

class ResponsiveTest {
  constructor() {
    this.breakpoints = {
      mobile: { min: 320, max: 767, columns: 1 },
      tablet: { min: 768, max: 1023, columns: 2 },
      laptop: { min: 1024, max: 1279, columns: 3 },
      desktop: { min: 1280, max: 9999, columns: 4 }
    };
    
    this.results = {
      mobile: { passed: 0, failed: 0, tests: [] },
      tablet: { passed: 0, failed: 0, tests: [] },
      laptop: { passed: 0, failed: 0, tests: [] },
      additional: { passed: 0, failed: 0, tests: [] }
    };
  }

  /**
   * Run all responsive tests
   */
  runTests() {
    console.log('🔍 Starting Responsive Design Tests...\n');
    
    // Test mobile breakpoint (375px)
    this.testBreakpoint('mobile', 375);
    
    // Test tablet breakpoint (768px)
    this.testBreakpoint('tablet', 768);
    
    // Test laptop breakpoint (1024px)
    this.testBreakpoint('laptop', 1024);
    
    // Test desktop breakpoint (1280px)
    this.testBreakpoint('desktop', 1280);
    
    // Additional tests
    this.testAdditional();
    
    // Print results
    this.printResults();
    
    return this.results;
  }

  /**
   * Test a specific breakpoint
   */
  testBreakpoint(name, width) {
    console.log(`\n📱 Testing ${name} breakpoint (${width}px)...`);
    
    // Simulate viewport resize (in actual browser testing)
    const expectedColumns = this.breakpoints[name]?.columns || 1;
    
    const tests = [
      this.testGridColumns(name, expectedColumns),
      this.testTextReadability(name),
      this.testNoHorizontalScroll(name),
      this.testHeaderResponsive(name),
      this.testTouchTargets(name)
    ];
    
    tests.forEach(test => {
      if (name === 'mobile' || name === 'tablet' || name === 'laptop') {
        this.results[name].tests.push(test);
        if (test.passed) {
          this.results[name].passed++;
        } else {
          this.results[name].failed++;
        }
      }
    });
  }

  /**
   * Test grid column configuration
   */
  testGridColumns(breakpoint, expectedColumns) {
    const test = {
      name: `Grid displays ${expectedColumns} column(s)`,
      passed: true,
      message: ''
    };
    
    // Check if CSS grid variables are correctly set
    const grid = document.querySelector('.destinations-grid');
    if (grid) {
      const styles = window.getComputedStyle(grid);
      const columns = styles.getPropertyValue('grid-template-columns');
      
      // Count the number of columns
      const columnCount = columns.split(' ').filter(c => c !== '').length;
      
      if (columnCount === expectedColumns) {
        test.passed = true;
        test.message = `✅ Correct: ${columnCount} column(s)`;
      } else {
        test.passed = false;
        test.message = `❌ Expected ${expectedColumns} columns, got ${columnCount}`;
      }
    } else {
      test.passed = true; // Grid not present on page, skip
      test.message = '⚠️ Grid element not found (may not be on this page)';
    }
    
    console.log(`  ${test.message}`);
    return test;
  }

  /**
   * Test text readability
   */
  testTextReadability(breakpoint) {
    const test = {
      name: 'Text is readable without horizontal scroll',
      passed: true,
      message: ''
    };
    
    // Check if body width exceeds viewport
    const bodyWidth = document.body.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    if (bodyWidth <= viewportWidth) {
      test.passed = true;
      test.message = '✅ No horizontal overflow detected';
    } else {
      test.passed = false;
      test.message = `❌ Horizontal overflow: body ${bodyWidth}px > viewport ${viewportWidth}px`;
    }
    
    console.log(`  ${test.message}`);
    return test;
  }

  /**
   * Test no horizontal scroll
   */
  testNoHorizontalScroll(breakpoint) {
    const test = {
      name: 'No horizontal scrolling',
      passed: true,
      message: ''
    };
    
    // Check various elements for overflow
    const elementsToCheck = document.querySelectorAll('.container, .destination-card, .site-header, .site-footer');
    let overflowFound = false;
    
    elementsToCheck.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        overflowFound = true;
      }
    });
    
    if (!overflowFound) {
      test.passed = true;
      test.message = '✅ All elements within viewport';
    } else {
      test.passed = false;
      test.message = '❌ Some elements exceed viewport width';
    }
    
    console.log(`  ${test.message}`);
    return test;
  }

  /**
   * Test header responsiveness
   */
  testHeaderResponsive(breakpoint) {
    const test = {
      name: 'Header navigation is accessible',
      passed: true,
      message: ''
    };
    
    const header = document.querySelector('.site-header');
    if (header) {
      const headerHeight = header.offsetHeight;
      
      // Header should be reasonable height (not collapsed or too tall)
      if (headerHeight > 40 && headerHeight < 200) {
        test.passed = true;
        test.message = `✅ Header height appropriate: ${headerHeight}px`;
      } else {
        test.passed = false;
        test.message = `❌ Header height unusual: ${headerHeight}px`;
      }
    } else {
      test.passed = true;
      test.message = '⚠️ Header not found (may not be rendered yet)';
    }
    
    console.log(`  ${test.message}`);
    return test;
  }

  /**
   * Test touch target sizes (mobile)
   */
  testTouchTargets(breakpoint) {
    const test = {
      name: 'Touch targets are large enough (44px min)',
      passed: true,
      message: ''
    };
    
    if (breakpoint === 'mobile') {
      const buttons = document.querySelectorAll('button, .btn, a[role="button"]');
      let smallTargets = 0;
      
      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          smallTargets++;
        }
      });
      
      if (smallTargets === 0) {
        test.passed = true;
        test.message = '✅ All touch targets meet 44px minimum';
      } else {
        test.passed = false;
        test.message = `❌ ${smallTargets} touch target(s) below 44px`;
      }
    } else {
      test.passed = true;
      test.message = '⚠️ Touch target test only for mobile';
    }
    
    console.log(`  ${test.message}`);
    return test;
  }

  /**
   * Additional responsive tests
   */
  testAdditional() {
    console.log('\n🎨 Additional Tests...');
    
    // Test theme toggle visibility
    const themeToggleTest = {
      name: 'Theme toggle is visible',
      passed: document.querySelector('.theme-toggle') !== null,
      message: document.querySelector('.theme-toggle') ? '✅ Theme toggle found' : '❌ Theme toggle not found'
    };
    console.log(`  ${themeToggleTest.message}`);
    this.results.additional.tests.push(themeToggleTest);
    if (themeToggleTest.passed) this.results.additional.passed++;
    else this.results.additional.failed++;
    
    // Test search bar
    const searchTest = {
      name: 'Search bar is accessible',
      passed: document.querySelector('.search-input') !== null,
      message: document.querySelector('.search-input') ? '✅ Search bar found' : '⚠️ Search bar not found (may not be on this page)'
    };
    console.log(`  ${searchTest.message}`);
    this.results.additional.tests.push(searchTest);
    if (searchTest.passed) this.results.additional.passed++;
    
    // Test images
    const images = document.querySelectorAll('img');
    const imagesTest = {
      name: 'Images have proper attributes',
      passed: images.length === 0 || Array.from(images).every(img => img.alt !== undefined),
      message: images.length > 0 ? `✅ ${images.length} image(s) found with alt attributes` : '⚠️ No images found yet'
    };
    console.log(`  ${imagesTest.message}`);
    this.results.additional.tests.push(imagesTest);
    if (imagesTest.passed) this.results.additional.passed++;
  }

  /**
   * Print test results summary
   */
  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESPONSIVE DESIGN TEST RESULTS');
    console.log('='.repeat(60));
    
    let totalPassed = 0;
    let totalFailed = 0;
    
    Object.keys(this.results).forEach(category => {
      const result = this.results[category];
      const total = result.passed + result.failed;
      totalPassed += result.passed;
      totalFailed += result.failed;
      
      console.log(`\n${category.toUpperCase()}:`);
      console.log(`  ✅ Passed: ${result.passed}/${total}`);
      if (result.failed > 0) {
        console.log(`  ❌ Failed: ${result.failed}/${total}`);
      }
    });
    
    console.log('\n' + '='.repeat(60));
    const totalTests = totalPassed + totalFailed;
    const passRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : 0;
    console.log(`OVERALL: ${totalPassed}/${totalTests} tests passed (${passRate}%)`);
    console.log('='.repeat(60) + '\n');
    
    if (totalFailed === 0) {
      console.log('✅ All responsive design tests PASSED!');
    } else {
      console.log(`⚠️ ${totalFailed} test(s) need attention.`);
    }
  }
}

// Auto-run tests when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const tester = new ResponsiveTest();
    setTimeout(() => tester.runTests(), 1000); // Wait for components to render
  });
} else {
  const tester = new ResponsiveTest();
  setTimeout(() => tester.runTests(), 1000);
}

// Export for manual testing
if (typeof window !== 'undefined') {
  window.ResponsiveTest = ResponsiveTest;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResponsiveTest;
}

// Collapsible Navigation for SUMMARY page
document.addEventListener('DOMContentLoaded', function () {
    // Make nested lists collapsible
    const makeCollapsible = () => {
        // Find all list items that contain nested lists
        const listItems = document.querySelectorAll('.md-content ul > li');

        listItems.forEach(item => {
            const nestedList = item.querySelector('ul');

            if (nestedList) {
                // Create toggle button
                const toggle = document.createElement('span');
                toggle.className = 'toc-toggle';
                toggle.innerHTML = '▼';
                toggle.style.cssText = `
          cursor: pointer;
          margin-right: 0.5rem;
          color: var(--md-primary-fg-color, #6B4C9A);
          font-size: 0.8em;
          display: inline-block;
          transition: transform 0.2s;
          user-select: none;
        `;

                // Insert toggle before the first text node
                const firstChild = item.firstChild;
                item.insertBefore(toggle, firstChild);

                // Initially collapse nested lists
                nestedList.style.display = 'none';
                toggle.style.transform = 'rotate(-90deg)';
                item.classList.add('collapsed');

                // Toggle on click
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();

                    if (item.classList.contains('collapsed')) {
                        nestedList.style.display = 'block';
                        toggle.style.transform = 'rotate(0deg)';
                        item.classList.remove('collapsed');
                    } else {
                        nestedList.style.display = 'none';
                        toggle.style.transform = 'rotate(-90deg)';
                        item.classList.add('collapsed');
                    }
                });
            }
        });
    };

    // Run on page load
    makeCollapsible();

    // Add "Expand All" / "Collapse All" buttons
    const addExpandCollapseButtons = () => {
        const content = document.querySelector('.md-content');
        if (!content) return;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
      margin-bottom: 1rem;
      display: flex;
      gap: 0.5rem;
    `;

        const expandAll = document.createElement('button');
        expandAll.textContent = 'Expand All';
        expandAll.className = 'md-button md-button--primary';
        expandAll.style.cssText = `
      background-color: #6B4C9A;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    `;

        const collapseAll = document.createElement('button');
        collapseAll.textContent = 'Collapse All';
        collapseAll.className = 'md-button';
        collapseAll.style.cssText = `
      background-color: #3C3228;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    `;

        expandAll.addEventListener('click', () => {
            document.querySelectorAll('.md-content ul ul').forEach(ul => {
                ul.style.display = 'block';
            });
            document.querySelectorAll('.toc-toggle').forEach(toggle => {
                toggle.style.transform = 'rotate(0deg)';
                toggle.parentElement.classList.remove('collapsed');
            });
        });

        collapseAll.addEventListener('click', () => {
            document.querySelectorAll('.md-content ul ul').forEach(ul => {
                ul.style.display = 'none';
            });
            document.querySelectorAll('.toc-toggle').forEach(toggle => {
                toggle.style.transform = 'rotate(-90deg)';
                toggle.parentElement.classList.add('collapsed');
            });
        });

        buttonContainer.appendChild(expandAll);
        buttonContainer.appendChild(collapseAll);

        const firstHeading = content.querySelector('h1, h2');
        if (firstHeading && firstHeading.nextSibling) {
            firstHeading.parentNode.insertBefore(buttonContainer, firstHeading.nextSibling);
        }
    };

    // Add buttons if on SUMMARY page
    if (window.location.pathname.includes('SUMMARY')) {
        addExpandCollapseButtons();
    }
});

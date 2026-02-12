#!/bin/bash
# Update all internal pages with requirePageAccess() and initializePage()

for file in bookings.html calendar.html leads.html customers.html invoices.html venues.html reports.html settings.html users.html audit.html workorders.html payouts.html events.html incidents.html; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    # Create backup
    cp "$file" "$file.bak"
    
    # Use sed to add the security check after $(document).ready
    sed -i '/\$(document)\.ready(async function() {/a\      // CRITICAL: Check page access first - security fix\n      if (!RoleManager.requirePageAccess()) {\n        return; // Stop execution if unauthorized\n      }\n' "$file"
    
    # Replace ComponentLoader.loadMultiple with initializePage call
    # Note: This is a simple replacement - may need manual review
    sed -i 's/await ComponentLoader\.loadMultiple(\[/\/\/ Components loaded via initializePage()\n      await initializePage(/' "$file"
    sed -i '/{ name: .sidebar., target: .sidebarContainer. },/d' "$file"
    sed -i '/{ name: .header., target: .headerContainer. }/d' "$file"
    sed -i 's/\]);$/);/' "$file"
    
    echo "  Done!"
  fi
done
echo "All pages updated!"

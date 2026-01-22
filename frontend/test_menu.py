from playwright.sync_api import sync_playwright

def test_menu():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        try:
            # Navigate with password
            print("Logging in...")
            page.goto('https://tacosloshuevones.com/?password=Tacos2026')
            page.wait_for_load_state('networkidle')
            page.wait_for_timeout(2000)

            # Close welcome modal if present
            try:
                close_btn = page.locator('button:has-text("Entendido")')
                if close_btn.is_visible(timeout=3000):
                    print("Closing welcome modal...")
                    close_btn.click()
                    page.wait_for_timeout(500)
            except:
                print("No welcome modal found")

            # Scroll down to menu section
            print("Scrolling to menu...")
            page.evaluate("window.scrollTo(0, 800)")
            page.wait_for_timeout(2000)

            # Take screenshot of menu
            page.screenshot(path='menu_screenshot.png', full_page=False)
            print("Screenshot saved: menu_screenshot.png")

            # Check for images
            images = page.locator('img').all()
            print(f"\nFound {len(images)} images on page")

            # Check menu card images specifically
            menu_images = page.locator('.group img').all()
            print(f"Found {len(menu_images)} menu card images")

            # Check for broken images
            broken = page.evaluate('''() => {
                const imgs = document.querySelectorAll('img');
                const broken = [];
                imgs.forEach(img => {
                    if (!img.complete || img.naturalHeight === 0) {
                        broken.push(img.src);
                    }
                });
                return broken;
            }''')

            if broken:
                print(f"\nBroken images: {broken}")
            else:
                print("\nNo broken images detected")

            # Keep browser open
            print("\nBrowser open for 10 seconds...")
            page.wait_for_timeout(10000)

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path='error.png')
        finally:
            browser.close()

if __name__ == '__main__':
    test_menu()

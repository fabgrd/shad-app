// Legacy color keys remapped onto the Shad design system (sky-blue / slate).
// Keeping the original key names lets every existing screen pick up the new
// palette with zero call-site changes. New code should import ../styles/theme.
const colors = {
    LIGHT_BLUE: '#44B0FF',                    // sky-400
    BLUE: '#1DA0FF',                          // sky-500 — primary accent
    LIGHTER_BLUE: '#D2ECFF',                  // sky-100 — soft accent fill
    LIGHT_GRAY: '#74828A',                    // slate-500
    GRAY: '#C4CCD0',                          // slate-300
    LIGHT_BLACK: 'rgba(24, 36, 42, 0.6)',     // slate ink @ 60%

    DEEP_PURPLE: '#0C68AD',                   // sky-700 (kept name for compat)
    ACCENT: '#2A9C63',                        // sage-500 — secondary accent
    SUCCESS: '#2FB67C',                       // green-500
    WARNING: '#F5A524',                       // amber-500
    BACKGROUND: '#F6F9FA',                    // slate-50 — app canvas
}

export default colors;

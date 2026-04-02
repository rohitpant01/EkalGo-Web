import sys

file_path = 'c:/EKALGO WEB/ekalgo-web/src/components/PreviewModal.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Overlay padding
old_overlay = '<div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/60 to-brand-900/90 flex flex-col items-center justify-center p-6 text-center">'
new_overlay = '<div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/60 to-brand-900/90 flex flex-col items-center justify-center p-4 sm:p-6 text-center">'
content = content.replace(old_overlay, new_overlay)

# 2. Update Icon
old_icon_container = 'className="w-14 h-14 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold mb-6 shadow-glow-gold/20"'
new_icon_container = 'className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold mb-4 sm:mb-6 shadow-glow-gold/20"'
content = content.replace(old_icon_container, new_icon_container)

# 3. Update Icon size
old_lock = '<Lock size={26} />'
new_lock = '<Lock size={22} className="sm:hidden" />\n                           <Lock size={26} className="hidden sm:block" />'
content = content.replace(old_lock, new_lock)

# 4. Update H3/P
content = content.replace('text-2xl font-display', 'text-xl sm:text-2xl font-display')
content = content.replace('max-w-xs mx-auto mb-8 font-body', 'max-w-[280px] sm:max-w-xs mx-auto mb-6 sm:mb-8 font-body')
content = content.replace('text-sm text-blue-100/50', 'text-xs sm:text-sm text-blue-100/50')

# 5. Update Button
old_btn = 'className="btn-primary py-4 px-10 flex items-center gap-4 font-bold group shadow-2xl relative overflow-hidden"'
new_btn = 'className="btn-primary py-3 sm:py-4 px-8 sm:px-10 flex items-center gap-3 sm:gap-4 font-bold group shadow-2xl relative overflow-hidden text-sm sm:text-base"'
content = content.replace(old_btn, new_btn)
content = content.replace('Unlock Full Itinerary', 'Unlock Itinerary')
content = content.replace('ArrowRight size={20}', 'ArrowRight size={18}')

with open(file_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("Fix applied successfully")

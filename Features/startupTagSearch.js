let tags = 'nude sex';

/**
 * Call this ONCE before XR starts
 * Example: initStartupTagSearch();
 */
export function initStartupTagSearch() {
  // container
  const panel = document.createElement('div');
  panel.style.position = 'fixed';
  panel.style.bottom = '20px';
  panel.style.left = '50%';
  panel.style.transform = 'translateX(-50%)';
  panel.style.background = '#111';
  panel.style.color = '#fff';
  panel.style.padding = '12px 16px';
  panel.style.borderRadius = '12px';
  panel.style.fontFamily = 'sans-serif';
  panel.style.zIndex = '9999';
  panel.style.width = '320px';
  panel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

  panel.innerHTML = `
    <div style="font-size:14px; margin-bottom:6px;">
      Rule34 Tags
    </div>

    <input
      id="r34-tags"
      type="text"
      placeholder="example: catgirl solo"
      style="
        width:100%;
        padding:8px;
        border-radius:8px;
        border:none;
        outline:none;
        font-size:14px;
      "
    />

    <div style="
      font-size:11px;
      opacity:0.7;
      margin-top:6px;
    ">
      Explicit content only. Illegal tags blocked.
    </div>
  `;

  document.body.appendChild(panel);

  const input = panel.querySelector('#r34-tags');

  input.addEventListener('input', e => {
    tags = sanitizeTags(e.target.value);
  });
}

/**
 * Used by popup spawner
 */
export function getTags() {
  return tags;
}

/**
 * Hard sanitization
 */
function sanitizeTags(raw) {
  return raw
    .toLowerCase()
    .replace(/loli|shota|child|underage|cub|minor|toddler/g, '')
    .trim();
}

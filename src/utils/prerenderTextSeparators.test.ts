import { insertTextSeparators, registerSnapshotTextSeparators } from './prerenderTextSeparators';

function build(): HTMLElement {
  const root = document.createElement('div');
  const span = document.createElement('span');
  span.append(document.createElement('svg'), document.createTextNode(' '), document.createTextNode('2'));
  const h2 = document.createElement('h2');
  h2.append(document.createTextNode('Find your'), document.createTextNode(' '), document.createElement('em'));
  root.append(span, h2, document.createTextNode('solo'));
  return root;
}

describe('insertTextSeparators', () => {
  it('separates adjacent text nodes so serialisation keeps the boundary', () => {
    const root = build();
    expect(root.innerHTML).toContain('</svg> 2</span>');

    expect(insertTextSeparators(root)).toBe(2);
    expect(root.innerHTML).toBe(
      '<span><svg></svg> <!-- -->2</span><h2>Find your<!-- --> <em></em></h2>solo',
    );
  });

  it('is idempotent once separated', () => {
    const root = build();
    insertTextSeparators(root);
    expect(insertTextSeparators(root)).toBe(0);
  });
});

describe('registerSnapshotTextSeparators', () => {
  it('runs on react-snap’s snapSaveState hook and persists no state', () => {
    const root = build();
    registerSnapshotTextSeparators(root);
    const hook = (window as Window & { snapSaveState?: () => object }).snapSaveState;
    expect(hook).toBeDefined();
    expect(hook!()).toEqual({});
    expect(root.innerHTML).toContain('<!-- -->2');
  });
});

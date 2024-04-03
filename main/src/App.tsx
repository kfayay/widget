import * as React from 'react';
import { DMEditor, dmeServerSideLoad, setDMEditorCallback, setDMEditorConfig } from 'dmeditor';
import { nanoid } from 'nanoid';

// import { BrowseImage, BrowseLink } from './callbacks';
// import registerSampleWidget from './SampleWidget';

// registerSampleWidget();

setDMEditorConfig({
  general: {
    projectStyles: {
      default: `background: white`,
    },
    // @ts-ignore
    themes: [
      {
        identifier: 'red',
        name: 'Red',
        cssStyle: `
        --project-main-color: red;
        --project-main-bg-color: #fbadad;
    
        /*background: var(--project-main-bg-color);  */
    
        /*todo: use css variable*/
      `,
      },
      {
        identifier: 'blue',
        name: 'Blue',
        cssStyle: `
        --project-main-color: blue;
        --project-main-bg-color: #e0e0ff;
        /*background: var(--project-main-bg-color);  */
      `,
      },
    ],
  },
  widgets: {
    heading: { defaultStyle: { _: 'big-space' } },
  },
});

// setDMEditorCallback({ browseImage: BrowseImage, browseLink: BrowseLink });

const { useRef, useEffect } = React;

const App = () => {
  useEffect(() => {}, []);

  const editorRef = useRef(null);
  // const [editor] = useEditor()
  const data = [
    {
      id: `widget-${nanoid()}`,
      style: { _: 'big-space' },
      data: {
        value: 'This is a heading',
        level: 2,
        settings: {
          align: 'left',
          // value: '',
        },
      },
      type: 'heading',
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: 'This is a heading 2',
        level: 2,
        settings: {
          align: 'right',
          // value: '',
        },
      },
      type: 'heading',
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        columns: 3,
      },
      type: 'grid',
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 1 ',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          type: 'list',
          data: {},
          children: [
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 1 in List ',
                level: 2,
              },
              type: 'heading',
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 2 in List',
                level: 2,
              },
              type: 'heading',
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 3 in List',
                level: 2,
              },
              type: 'heading',
            },
          ],
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3',
            level: 2,
          },
          type: 'heading',
        },
      ],
    },
    {
      id: `widget-${nanoid()}`,
      type: 'list',
      data: {
        direction: 'horizontal',
      },
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 1 in List ',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2 in List',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3 in List',
            level: 2,
          },
          type: 'heading',
        },
      ],
    },
  ];
  useEffect(() => {
    const current = editorRef.current as any;
    if (!current) return;
    current?.setEditorJson(data);
    current?.setPageSettings([
      { identifier: 'cover_image', name: 'Cover image', type: 'image' },
      { identifier: 'summary', name: 'Summary', type: 'richtext' },
      { identifier: 'meta_key', name: 'Meta key', type: 'text' },
      { identifier: 'meta_description', name: 'Meta description', type: 'multitext' },
    ]);
    current?.setPageData({ title: 'New page', theme: 'red', meta_key: 'test key' });
    current?.onSave((data: any) => {
      window.alert('Saved');
    });
  }, []);

  // @ts-ignore
  return <DMEditor ref={editorRef} />;
  // return <DMEditorView data={data} theme="blue" />;
};

export default App;

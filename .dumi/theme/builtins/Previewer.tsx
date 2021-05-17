import * as React from 'react';
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';
import { context, usePrefersColor } from 'dumi/theme';
import { loadDarkStyle, unloadDarkStyle } from './_utils';


export default ({ children, background, ...rest }: IPreviewerProps) => {
  const [theme] = usePrefersColor();
  const ctx = React.useContext(context);

  const previewProps = React.useMemo(() => {
    const ret = { ...rest };
    if (theme !== "dark") {
      ret.background = background;
    }
    return ret;
  }, [background, rest, theme]);

  React.useEffect(() => {
    if (theme !== "dark") {
      unloadDarkStyle()
    } else {
      loadDarkStyle()
    }
  }, [theme]);

  return (
    <PreView {...previewProps}>
      <div
        style={{
          minHeight: rest.height || 'auto',
        }}
      >
        {children}
      </div>
    </PreView>
  )
}
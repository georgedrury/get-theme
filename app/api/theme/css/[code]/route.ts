import { createClient } from '@supabase/supabase-js'
import { useParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

interface ThemeToken {
  name: string;
  primitive_id: {
    value: string;
    type: string;
  };
}

export async function GET(
  request: NextRequest, 
  {params}:{params:{code:string}}
  ) {  

  const code = params.code
  
  try {
    const supabase = createClient('https://abvntlmhgvudinbgwqol.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidm50bG1oZ3Z1ZGluYmd3cW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQzNzIzMzksImV4cCI6MjAwOTk0ODMzOX0.qO-ZypAO3EbViq92HUyVy-BAKTNqw8SRfUgzWW_3TRA');
    
    const { data: collectionId, error: themeError } = await supabase
        .from("themes")
        .select("token_collection")
        .eq("code", code)
        .single()

    const { data: tokens_from_theme, error: tokenError } = await supabase
      .from("tokens")
      .select(`name, primitive_id(value, type)`)
      .eq("collection_id", collectionId!.token_collection)
      

    const cssVariables = ((tokens_from_theme as unknown) as ThemeToken[])
      .map((t) => `\t--${t.name}: ${t.primitive_id.value};`)
      .join('\n');

    const cssString = `:root {\n${cssVariables}\n}`;

    const headers = {
      'Content-Type': 'text/css',
      // 'Content-Disposition': `attachment; filename=theme-${code}.css`,
    };

    // const theme = tokens_from_theme?.reduce((acc:any, token:any) => {
    //   acc[token.name] = token.primitive_id.value;
    //   return acc;
    // }, {});

    return new NextResponse(cssString, { headers });

  } catch (err:any) {
    console.log(err);
    new NextResponse('Internal es', { status: 500 })
  }

};
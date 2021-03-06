import { Heading, Grid, Card, useThemeUI } from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import themes from '../lib/themes'
import { kebabCase } from 'lodash'

const Themes = ({ minimal = false, ...props }) => {
  const { pathname, query } = useRouter()
  const active = pathname.startsWith('/themes/') ? query.id : false
  const { theme } = useThemeUI()
  return [
    <Heading
      key="heading"
      as="h2"
      id="themes"
      variant={minimal ? 'subheadline' : 'headline'}
      sx={{ color: minimal ? 'muted' : 'secondary' }}
    >
      Explore by theme
    </Heading>,
    <Grid
      key="grid"
      as="nav"
      columns={[2, 4]}
      gap={3}
      sx={{ pb: minimal ? [3, 4] : [4, 5] }}
      {...props}
    >
      {themes.map(({ name, color }) => (
        <Link
          href={`/themes/${kebabCase(name)}`}
          passHref
          prefetch={false}
          key={name}
        >
          <Card
            as="a"
            sx={{
              borderRadius: 'extra',
              fontSize: 2,
              fontWeight: 'bold',
              lineHeight: 'title',
              overflow: 'hidden',
              position: 'relative',
              color: 'white',
              p: [3, 3],
              py: minimal ? null : [null, 4],
              textAlign: 'left',
              textDecoration: 'none',
              WebkitTapHighlightColor: 'transparent',
              transition:
                'transform .25s ease-in-out, box-shadow .125s ease-in-out',
              ':hover,:focus': {
                transform: 'scale(1.25) rotate(-8deg)',
                zIndex: 2,
                boxShadow: 'elevated'
              },
              '@media (prefers-reduced-motion: reduce)': {
                transform: 'none !important'
              }
            }}
            style={{
              backgroundColor: color,
              boxShadow:
                active === kebabCase(name)
                  ? `0 0 0 3px ${theme.colors.sheet}, 0 0 0 6px ${color}`
                  : theme.shadows.card
            }}
          >
            {name}
          </Card>
        </Link>
      ))}
    </Grid>
  ]
}

export default Themes

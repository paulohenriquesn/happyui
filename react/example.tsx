/**
 * One small screen built with the HappyUI React layer.
 * It is also the type check for the library: `npx tsc -p tsconfig.json`.
 *
 * Needs the stylesheet once, in your app root:
 *   import "happyui/dist/happyui.css";
 */
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Alert,
  Annotation,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Callout,
  Card,
  CardFooter,
  CardIcon,
  CardText,
  CardTitle,
  Checkbox,
  Checklist,
  ChecklistItem,
  Chip,
  Cluster,
  Container,
  Dialog,
  Display,
  EmptyState,
  Eyebrow,
  Field,
  Footer,
  FooterBottom,
  FooterBrand,
  FooterColumn,
  FooterColumns,
  FooterMain,
  Grid,
  Heading,
  Hero,
  HeroCopy,
  HeroMedia,
  Icon,
  Input,
  Lede,
  Link,
  Logo,
  Marker,
  Menu,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  Nav,
  NavActions,
  NavLink,
  NavLinks,
  NavMenu,
  Note,
  Option,
  Pagination,
  PaginationGap,
  PaginationItem,
  Price,
  Progress,
  Quote,
  Radio,
  Range,
  Reveal,
  Root,
  Scribble,
  Section,
  SectionHead,
  Select,
  Skeleton,
  Stack,
  Stat,
  Step,
  Steps,
  Switch,
  Tab,
  Table,
  TabList,
  TabPanel,
  Tabs,
  Tape,
  Td,
  Textarea,
  Th,
  ThemeToggle,
  ToastProvider,
  Tooltip,
  Window,
  useToast,
} from "./happyui";

/* A few icons. Any outline icon set works: pass its SVG shapes as children. */
const PlusIcon = () => (
  <Icon size="sm">
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const HeartIcon = () => (
  <Icon tone="pink">
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  </Icon>
);
const InfoIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5M12 7.8v.2" />
  </Icon>
);
const SmileIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 14.2c1.8 2.2 5.2 2.2 7 0M9 9.6v.4M15 9.6v.4" />
  </Icon>
);

interface Win {
  id: number;
  text: string;
  done: boolean;
}

const PAGES = [1, 2, 3, 9];

function Screen() {
  const toast = useToast();
  const [wins, setWins] = useState<Win[]>([
    { id: 1, text: "Drink a big glass of water", done: true },
    { id: 2, text: "Ten minute walk outside", done: true },
    { id: 3, text: "Read five pages of a book", done: false },
  ]);
  const [tab, setTab] = useState("today");
  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");
  const [plan, setPlan] = useState("team");
  const [page, setPage] = useState(2);
  const [email, setEmail] = useState("sam@");
  const [saving, setSaving] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const done = wins.filter((win) => win.done).length;
  const shown = wins.filter((win) => (filter === "all" ? true : filter === "done" ? win.done : !win.done));
  const emailError = email.includes("@") && email.split("@")[1] === "" ? "That e-mail ends too soon." : undefined;

  const save = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast("We saved your note.", { title: "Saved!", tone: "green" });
    }, 900);
  };

  return (
    <>
      <Nav>
        <Logo href="#top" mark={<SmileIcon />}>
          happyui
        </Logo>
        <NavLinks>
          <NavLink href="#wins" current>
            Wins
          </NavLink>
          <NavLink href="#plans">Plans</NavLink>
          <NavLink href="#faq">Questions</NavLink>
        </NavLinks>
        <NavActions>
          <ThemeToggle />
          <Menu trigger="Account" size="sm" align="end">
            <MenuLabel>Signed in as Sam</MenuLabel>
            <MenuItem shortcut="P">Profile</MenuItem>
            <MenuItem href="#plans">Plans</MenuItem>
            <MenuSeparator />
            <MenuItem danger onClick={() => setConfirming(true)}>
              Delete account
            </MenuItem>
          </Menu>
        </NavActions>
        <NavMenu>
          <NavLink href="#wins">Wins</NavLink>
          <NavLink href="#plans">Plans</NavLink>
          <NavLink href="#faq">Questions</NavLink>
        </NavMenu>
      </Nav>

      <main id="top">
        <Container>
          <Hero>
            <HeroCopy>
              <Banner href="#wins">
                <Badge variant="solid" tone="red">
                  New
                </Badge>{" "}
                Version 1.0 is out
              </Banner>
              <Display>
                Make tiny wins feel <Scribble>hand-made.</Scribble>
              </Display>
              <Lede>A warm little tracker for the things you do every day. Plain CSS underneath, React on top.</Lede>
              <ButtonGroup>
                <Button variant="primary" size="lg" icon={<PlusIcon />} hint="takes ten seconds" href="#wins">
                  Start a streak
                </Button>
                <Button variant="ghost">Browse ideas</Button>
              </ButtonGroup>
            </HeroCopy>
            <HeroMedia>
              <Reveal>
                <Tape corner="tl" />
                <Window title="Tiny Wins · today" tilt={-1}>
                  <Cluster gap={12}>
                    <Eyebrow>Good morning, Sam!</Eyebrow>
                    <AvatarGroup>
                      <Avatar size="sm" tone="pink" name="Ana" />
                      <Avatar size="sm" tone="blue" name="Jo" />
                    </AvatarGroup>
                  </Cluster>
                  <Progress value={(done / wins.length) * 100} tone="green" aria-label="Progress today" />
                  <Cluster>
                    <Badge tone="blue">
                      {done} of {wins.length} done
                    </Badge>
                    <Badge variant="dot" tone="pink">
                      12 day streak
                    </Badge>
                  </Cluster>
                </Window>
                <Note tone="pink" by="sunday, 5 pm" tilt={4}>
                  call grandma!
                </Note>
              </Reveal>
            </HeroMedia>
          </Hero>
        </Container>

        <Section id="wins">
          <Container>
            <SectionHead>
              <Eyebrow>Today</Eyebrow>
              <Heading>
                Three tiny wins and <Marker tone="pink">a happy day</Marker>
              </Heading>
            </SectionHead>

            <Grid cols={2}>
              <Card>
                <Tabs value={tab} onValueChange={setTab} variant="line" tone="blue">
                  <TabList aria-label="Views">
                    <Tab value="today">Today</Tab>
                    <Tab value="week">This week</Tab>
                    <Tab value="all">Everything</Tab>
                  </TabList>
                  <TabPanel value="today">
                    <Stack gap={12}>
                      <Cluster>
                        <Chip pressed={filter === "all"} onClick={() => setFilter("all")}>
                          All
                        </Chip>
                        <Chip tone="green" pressed={filter === "done"} onClick={() => setFilter("done")}>
                          Done
                        </Chip>
                        <Chip tone="orange" pressed={filter === "todo"} onClick={() => setFilter("todo")}>
                          To do
                        </Chip>
                      </Cluster>
                      {shown.length === 0 ? (
                        <EmptyState
                          art={<HeartIcon />}
                          title="Nothing here yet"
                          description="Pick another filter, or add a win."
                        />
                      ) : (
                        shown.map((win) => (
                          <Checkbox
                            key={win.id}
                            checked={win.done}
                            onChange={() =>
                              setWins((list) => list.map((w) => (w.id === win.id ? { ...w, done: !w.done } : w)))
                            }
                          >
                            {win.text}
                          </Checkbox>
                        ))
                      )}
                    </Stack>
                  </TabPanel>
                  <TabPanel value="week">
                    <Table caption="Wins this week">
                      <thead>
                        <tr>
                          <Th>Day</Th>
                          <Th>Status</Th>
                          <Th numeric>Wins</Th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <Td>Monday</Td>
                          <Td>
                            <Badge variant="dot" tone="green">
                              Done
                            </Badge>
                          </Td>
                          <Td numeric>3</Td>
                        </tr>
                        <tr>
                          <Td>Tuesday</Td>
                          <Td>
                            <Badge variant="dot" tone="orange">
                              Partly
                            </Badge>
                          </Td>
                          <Td numeric>2</Td>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel value="all">
                    <Cluster gap={24}>
                      <Stat value="128" label="wins so far" delta="+18% this month" deltaTone="green" />
                      <Stat value="4.9" label="happiness" delta="from 2,300 votes" deltaTone="blue" />
                    </Cluster>
                  </TabPanel>
                </Tabs>
                <CardFooter>
                  <Tooltip content="Add one more win">
                    <Button
                      iconOnly
                      size="sm"
                      aria-label="Add a win"
                      onClick={() => toast("A new win is on the list.")}
                    >
                      <PlusIcon />
                    </Button>
                  </Tooltip>
                  <Link href="#faq">See how it works</Link>
                </CardFooter>
              </Card>

              <Card as="section" size="lg">
                <CardIcon symbol="i-smile" tone="yellow" />
                <CardTitle>Leave a note</CardTitle>
                <CardText>Tell us how your day went. We read every one.</CardText>
                <Field
                  label="E-mail"
                  aside="we never spam"
                  hint="We only write when something good happens."
                  error={emailError}
                >
                  <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </Field>
                <Field label="Plan">
                  <Select value={plan} onChange={(event) => setPlan(event.target.value)}>
                    <option value="free">Free, for one person</option>
                    <option value="team">Team, up to 10 people</option>
                  </Select>
                </Field>
                <Field label="Note" aside="optional">
                  <Textarea placeholder="Say something nice..." />
                </Field>
                <Cluster>
                  <Radio name="mood" defaultChecked>
                    Sunny
                  </Radio>
                  <Radio name="mood" tone="blue">
                    Rainy
                  </Radio>
                </Cluster>
                <Switch tone="purple" defaultChecked>
                  Cheerful sounds
                </Switch>
                <Field label="Happiness level">
                  <Range defaultValue={72} />
                </Field>
                <Alert tone="info" title="Heads up">
                  A new version is ready. It installs when you restart.
                </Alert>
                <CardFooter>
                  <Button variant="primary" busy={saving} onClick={save}>
                    Save note
                  </Button>
                  <Button variant="ghost" type="reset">
                    Clear
                  </Button>
                </CardFooter>
              </Card>
            </Grid>
          </Container>
        </Section>

        <Section id="plans" tight>
          <Container>
            <Stack gap={56}>
              <Steps>
                <Step title="Install">Add one CSS file.</Step>
                <Step title="Doodle">Use the components.</Step>
                <Step title="Smile">Ship it.</Step>
              </Steps>

              <Grid cols={3} gap={28}>
                <Quote
                  tone="orange"
                  tilt={-0.6}
                  name="Maya Torres"
                  detail="runs a tiny bakery shop"
                  avatar={<Avatar tone="orange" name="Maya" />}
                >
                  It made our checkout page feel like a birthday card.
                </Quote>
                <Price name="Free" amount="$0" period="forever">
                  <Checklist tone="green">
                    <ChecklistItem>Every component</ChecklistItem>
                    <ChecklistItem>Light and dark themes</ChecklistItem>
                    <ChecklistItem off>A pony</ChecklistItem>
                  </Checklist>
                  <Button block href="#top">
                    Start doodling
                  </Button>
                </Price>
                <Price featured flag="Most loved" name="Team" amount="$9" period="per month">
                  <Checklist>
                    <ChecklistItem>Everything in Free</ChecklistItem>
                    <ChecklistItem>Shared color themes</ChecklistItem>
                  </Checklist>
                  <Button variant="primary" block href="#top">
                    Make it happy
                  </Button>
                </Price>
              </Grid>

              <Cluster gap={16}>
                <Option
                  title="Free"
                  meta="one person"
                  icon={<InfoIcon />}
                  selected={plan === "free"}
                  onClick={() => setPlan("free")}
                />
                <Option
                  title="Team"
                  meta="up to 10 people"
                  tone="green"
                  icon={<InfoIcon />}
                  selected={plan === "team"}
                  onClick={() => setPlan("team")}
                />
                <Annotation direction="up-right" tone="blue">
                  pick one
                </Annotation>
              </Cluster>
            </Stack>
          </Container>
        </Section>

        <Section id="faq" tight>
          <Container narrow>
            <Stack gap={20}>
              <Breadcrumb>
                <BreadcrumbItem href="#top">Home</BreadcrumbItem>
                <BreadcrumbItem current>Questions</BreadcrumbItem>
              </Breadcrumb>
              <Accordion>
                <AccordionItem title="Is HappyUI free?" defaultOpen>
                  <p>Yes. It is MIT licensed, so you can use it in personal and commercial work.</p>
                </AccordionItem>
                <AccordionItem title="Does it need the script?">
                  <p>No. The React layer does tabs, menus, dialogs, toasts and the theme itself.</p>
                </AccordionItem>
              </Accordion>
              <Skeleton variant="title" />
              <Skeleton variant="text" style={{ width: "80%" }} />
              <Pagination>
                <PaginationItem aria-label="Previous page" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  &larr;
                </PaginationItem>
                {PAGES.map((n, index) => (
                  <Fragment key={n}>
                    {index === PAGES.length - 1 && <PaginationGap />}
                    <PaginationItem current={page === n} onClick={() => setPage(n)}>
                      {n}
                    </PaginationItem>
                  </Fragment>
                ))}
                <PaginationItem aria-label="Next page" disabled={page === 9} onClick={() => setPage(page + 1)}>
                  &rarr;
                </PaginationItem>
              </Pagination>
            </Stack>
          </Container>
        </Section>

        <Container>
          <Callout
            title={
              <>
                Ready to make something happy? <em>Grab the files and go.</em>
              </>
            }
          >
            <ButtonGroup>
              <Button variant="primary" size="lg" href="https://github.com/paulohenriquesn/happyui">
                Get it on GitHub
              </Button>
            </ButtonGroup>
          </Callout>
        </Container>
      </main>

      <Footer>
        <FooterMain>
          <FooterBrand>
            <Logo href="#top" mark={<SmileIcon />}>
              happyui
            </Logo>
            <p>A hand-drawn design system for websites that want to smile.</p>
          </FooterBrand>
          <FooterColumns>
            <FooterColumn title="Learn">
              <li>
                <a href="#wins">Wins</a>
              </li>
              <li>
                <a href="#plans">Plans</a>
              </li>
            </FooterColumn>
          </FooterColumns>
        </FooterMain>
        <FooterBottom>
          <span>Made with a pencil and a lot of coffee.</span>
        </FooterBottom>
      </Footer>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Delete your account?"
        description="Every win you logged will be gone for good. This cannot be undone."
        actions={
          <>
            <Button variant="ghost" onClick={() => setConfirming(false)}>
              Keep it
            </Button>
            <Button
              tone="red"
              onClick={() => {
                setConfirming(false);
                toast("Your account is gone.", { tone: "red", title: "Deleted" });
              }}
            >
              Delete account
            </Button>
          </>
        }
      />
    </>
  );
}

export default function Example() {
  return (
    <Root>
      <ToastProvider>
        <Screen />
      </ToastProvider>
    </Root>
  );
}

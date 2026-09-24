import { Document, Page, StyleSheet, View } from "@formepdf/react";

import { Badge } from "@/registry/bases/forme/components/badge/badge";
import { PdfList } from "@/registry/bases/forme/components/list/list";
import { PageFooter } from "@/registry/bases/forme/components/page-footer/page-footer";
import { PageHeader } from "@/registry/bases/forme/components/page-header/page-header";
import { Section } from "@/registry/bases/forme/components/section/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/registry/bases/forme/components/table/table";
import { Text } from "@/registry/bases/forme/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/forme/components/theme-provider";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { LessonPlanProps } from "./lesson-plan.types";
import { sampleLessonPlanData } from "./lesson-plan.types";

export const LessonPlanContent = ({ data }: { data: LessonPlanProps }) => {
  const theme = usePdfcnTheme();
  const accent = data.accentColor ?? theme.colors.primary;

  const styles = StyleSheet.create({
    badgeWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 3,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      color: theme.colors.foreground,
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
    },
    reflectionLine: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      height: 16,
    },
    sectionHeading: {
      fontSize: 9,
      fontWeight: "bold",
      marginBottom: 3,
    },
    twoColumn: {
      flexDirection: "row",
      gap: 15,
    },
  });

  return (
    <Document title={`Lesson Plan — ${data.lessonTitle}`}>
      <Page size="A4">
        <View style={styles.page as never}>
          <PageHeader
            marginBottom={12}
            rightSubText={`Teacher: ${data.teacherName} · ${data.duration}`}
            rightText={data.date}
            subtitle={`${data.subject} · ${data.gradeLevel}`}
            title={data.lessonTitle}
            variant="two-column"
          />

          {data.essentialQuestion && (
            <Section accentColor={accent} spacing="sm" variant="callout">
              <Text color="primary" noMargin style={styles.sectionHeading}>
                Essential Question
              </Text>
              <Text noMargin style={{ fontSize: 9.5, fontStyle: "italic" }}>
                &ldquo;{data.essentialQuestion}&rdquo;
              </Text>
            </Section>
          )}

          {data.objectives.length > 0 && (
            <Section spacing="sm">
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Learning Objectives (SWBAT)
              </Text>
              <PdfList
                gap="xs"
                items={data.objectives.map((text) => ({ text }))}
                variant="numbered"
              />
            </Section>
          )}

          <Section spacing="sm" style={styles.twoColumn as never}>
            <View style={{ flex: 1 } as never}>
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Standards Alignment
              </Text>
              {data.standards && data.standards.length > 0 ? (
                <View style={styles.badgeWrap as never}>
                  {data.standards.map((std) => (
                    <Badge key={std} label={std} size="sm" variant="outline" />
                  ))}
                </View>
              ) : (
                <Text color="mutedForeground" noMargin variant="xs">
                  None specified
                </Text>
              )}
            </View>
            <View style={{ flex: 1 } as never}>
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Materials &amp; Resources
              </Text>
              <PdfList
                gap="xs"
                items={data.materials.map((text) => ({ text }))}
                variant="bullet"
              />
            </View>
          </Section>

          <Section spacing="sm">
            <Text
              color="mutedForeground"
              noMargin
              style={styles.sectionHeading}
              transform="uppercase"
            >
              Lesson Sequence &amp; Timing
            </Text>
            <Table variant="grid" zebraStripe>
              <TableHeader>
                <TableRow header>
                  <TableCell width="14%">Time</TableCell>
                  <TableCell width="24%">Activity</TableCell>
                  <TableCell width="42%">Description</TableCell>
                  <TableCell width="20%">Notes</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.sequence.map((step) => (
                  <TableRow key={`${step.time}-${step.activity}`}>
                    <TableCell
                      style={{ fontSize: 8, fontWeight: 600 }}
                      width="14%"
                    >
                      {step.time}
                    </TableCell>
                    <TableCell
                      style={{ fontSize: 8, fontWeight: 600 }}
                      width="24%"
                    >
                      {step.activity}
                    </TableCell>
                    <TableCell style={{ fontSize: 8 }} width="42%">
                      {step.description}
                    </TableCell>
                    <TableCell
                      style={{
                        color: theme.colors.mutedForeground,
                        fontSize: 8,
                      }}
                      width="20%"
                    >
                      {step.notes ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>

          {data.differentiation && data.differentiation.length > 0 && (
            <Section spacing="sm" variant="highlight">
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Differentiation &amp; Diverse Learners
              </Text>
              <PdfList
                gap="xs"
                items={data.differentiation.map((text) => ({ text }))}
                variant="bullet"
              />
            </Section>
          )}

          <Section spacing="sm" style={styles.twoColumn as never}>
            <View style={{ flex: 1 } as never}>
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Formative Assessment
              </Text>
              {data.assessment.formative &&
              data.assessment.formative.length > 0 ? (
                data.assessment.formative.map((item) => (
                  <Text
                    key={item}
                    noMargin
                    style={{ marginBottom: 3 }}
                    variant="xs"
                  >
                    • {item}
                  </Text>
                ))
              ) : (
                <Text color="mutedForeground" noMargin variant="xs">
                  Ongoing observation
                </Text>
              )}
            </View>
            <View style={{ flex: 1 } as never}>
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Summative Assessment
              </Text>
              {data.assessment.summative &&
              data.assessment.summative.length > 0 ? (
                data.assessment.summative.map((item) => (
                  <Text
                    key={item}
                    noMargin
                    style={{ marginBottom: 3 }}
                    variant="xs"
                  >
                    • {item}
                  </Text>
                ))
              ) : (
                <Text color="mutedForeground" noMargin variant="xs">
                  None for this session
                </Text>
              )}
            </View>
          </Section>

          {data.homework && (
            <Section spacing="sm">
              <Text
                color="mutedForeground"
                noMargin
                style={styles.sectionHeading}
                transform="uppercase"
              >
                Homework Assignment
              </Text>
              <Text noMargin variant="xs">
                {data.homework}
              </Text>
            </Section>
          )}

          <Section spacing="sm">
            <Text
              color="mutedForeground"
              noMargin
              style={styles.sectionHeading}
              transform="uppercase"
            >
              Teacher Reflection
            </Text>
            {data.reflection ? (
              <Text noMargin style={{ fontStyle: "italic" }} variant="xs">
                {data.reflection}
              </Text>
            ) : (
              <View>
                <View style={styles.reflectionLine as never} />
                <View style={styles.reflectionLine as never} />
              </View>
            )}
          </Section>

          <PageFooter
            leftText={`${data.subject} · ${data.lessonTitle}`}
            pagePadding={25}
            rightText={`${data.teacherName} · ${data.date}`}
            sticky
          />
        </View>
      </Page>
    </Document>
  );
};

export const LessonPlanDocument = ({
  data = sampleLessonPlanData,
  theme,
}: {
  data?: LessonPlanProps;
  theme?: PdfcnTheme;
}) => (
  <PdfcnThemeProvider theme={theme}>
    <LessonPlanContent data={data} />
  </PdfcnThemeProvider>
);

export default LessonPlanDocument;

<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-3 mt-0">
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CDropdown color="secondary">
                    <CDropdownToggle color="primary">
                      identifier
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">user_id</CDropdownItem>
                      <CDropdownItem href="#">username</CDropdownItem>
                      <CDropdownItem href="#">email</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CTableDataCell>
                <CTableDataCell>
                  <CDropdown color="secondary">
                    <CDropdownToggle color="primary">
                      identifier
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">match</CDropdownItem>
                      <CDropdownItem href="#">like</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CTableDataCell>
                <CTableDataCell>
                  <CInputGroup class="mb-3">
                    <CFormInput
                      placeholder="word"
                      aria-label="word"
                      aria-describedby="button-addon2"
                    />
                    <CButton
                      type="button"
                      color="secondary"
                      variant="outline"
                      id="button-addon2"
                      >Query
                    </CButton>
                  </CInputGroup>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CCard class="mb-2">
        <CCardBody>
          <CAccordion flush>
            <CAccordionItem>
              <CAccordionHeader> Accordion Item #1 </CAccordionHeader>
              <CAccordionBody>
                <strong>This is the first item's accordion body.</strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader> Accordion Item #2 </CAccordionHeader>
              <CAccordionBody>
                <strong>This is the second item's accordion body.</strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader> Accordion Item #3 </CAccordionHeader>
              <CAccordionBody>
                <strong>This is the third item's accordion body.</strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader> Accordion Item #4 </CAccordionHeader>
              <CAccordionBody>
                <strong>This is the third item's accordion body.</strong>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem>
              <CAccordionHeader> Accordion Item #5 </CAccordionHeader>
              <CAccordionBody>
                <strong>This is the third item's accordion body.</strong>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem href="#">Previous</CPaginationItem>
        <CPaginationItem href="#">1</CPaginationItem>
        <CPaginationItem href="#">2</CPaginationItem>
        <CPaginationItem href="#">3</CPaginationItem>
        <CPaginationItem href="#">Next</CPaginationItem>
      </CPagination>
    </CCol>
  </CRow>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Accordion',
  setup() {
    const activeKey = ref(1)
    const flushActiveKey = ref(1)

    return {
      activeKey,
      flushActiveKey,
    }
  },
}
</script>
